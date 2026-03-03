export default defineNuxtRouteMiddleware((to, from) => {
  if(process.client){
    const freeLinks = appcfg.freeLink.map(l => '/' + l);

    if(getSess() == null){
      // Not logged in - allow only free pages, redirect everything else to login
      if(!freeLinks.includes(to.path)){
        return navigateTo('/main/login');
      }
    } else {
      // Logged in - redirect away from login page to home
      if(to.path === '/main/login'){
        return navigateTo('/');
      }
    }
  }
})