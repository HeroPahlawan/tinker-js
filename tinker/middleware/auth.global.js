export default defineNuxtRouteMiddleware(async(to, from) => {
  if(process.client){
    // if(to.path !== '/main/login'){
    //   const myAlert = await alert();
    //   let grantAccess = false;
    //   let myLevel = 0;
    //   const data = localData();
    //   const session = getSess();
    //   if(data && session && data.role){
    //     for(const [k,v] of Object.entries(localData().role)){
    //       if(getSess().role == v.code){
    //         for(const [x,y] of Object.entries(v.option)){
    //           switch (y) {
    //             case 'N': myLevel = 0; break;
    //             case 'R': myLevel = 1; break;
    //             case 'W': myLevel = 2; break;
    //             default: myLevel = 0; break;
    //           }
    //           if(x.toLowerCase() == to.path.toLowerCase()){
    //             if(myLevel > 0){
    //               grantAccess = true
    //             }
    //           }
    //         }
    //       }
    //     }
    //     if( ! grantAccess){
    //       myAlert.error(`Unauthorized for access '${to.path}'`);
    //       if(from.path == to.path){
    //         return navigateTo('/');
    //       }else{
    //         return abortNavigation();
    //       }
    //     }
    //   }
    // }

    // logout if no session
    if(getSess() == null){
      if(appcfg.freeLink.includes(to.path)){
        if(to.path !== '/main/login'){
          return navigateTo('/main/login');
        }
      }
    }
  }
})