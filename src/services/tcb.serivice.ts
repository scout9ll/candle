import cloudbase from "@cloudbase/js-sdk"

class TcbService {
    private db
    private auth
    constructor(iCloudbaseConfig: cloudbase.ICloudbaseConfig) {
        const app = cloudbase.init(iCloudbaseConfig);
        this.auth = app.auth({
            persistence: "local"
        });
        // this.tcbServiceInit()
        // this.userInfo = this.auth.currentUser
        this.db = app.database()

    }
    // async tcbServiceInit() {
    //     const app = cloudbase.init({
    //         env: TcbService.tcbEnvCode
    //     });
    //     const auth = this.auth = app.auth();

    //     // 应用初始化时 ,不需要判断登录态，直接利用currentUser判断
    //     if (auth.hasLoginState()) {
    //         // 此时已经登录
    //     } else {

    //         await this.login()
    //         // 此时未登录，执行您的登录流程
    //     }
    // }

    async login() {
        await this.auth.anonymousAuthProvider().signIn();
        // 匿名登录成功检测登录状态isAnonymous字段为true
        // const loginState = await this.auth.getLoginState();
        // const user = this.auth.currentUser
        // console.log(loginState && loginState.isAnonymousAuth, user); // true
    }
    async getUserInfo() {
        console.log(this.auth)
        while (!this.auth.currentUser) {
            await this.login()
        } 
        return this.auth.currentUser
    }

    getCollection(collection: string) {
        return this.db
            // collection() 方法获取一个集合的引用
            .collection(collection)

    }

}
// single instance
const myTcbService = new TcbService({
    env: process.env.REACT_APP_TCB_ENV_code as string
})
export default myTcbService