const config = {
  appName: 'Tinker',
  apiUrl: 'http://localhost:3001',
  //fileUrl: 'https://wheybhwfga.execute-api.ap-southeast-3.amazonaws.com/dev/inshopper-storage/',
  realm: '350pr3a1m',
  menu: [
    { name: 'Home', icon: 'fa-solid fa-house', link: '/', submenu: [] },
    { name: 'Config', icon: 'fa-solid fa-gear', link: '', submenu: [
      {subname: 'User', subicon: 'fa-regular fa-user', sublink: '/config/user'},
      {subname: 'Role', subicon: 'fa-regular fa-folder', sublink: '/config/role'},
      // [TINKER:SUBMENU:config]
    ] },
    { name: 'Master', icon: 'fa-solid fa-folder', link: '', submenu: [
      {subname: 'Branch', subicon: 'fa-regular fa-circle', sublink: '/master/branch/'},
      // [TINKER:SUBMENU:master]
    ] },
    // [TINKER:MENU:END]
  ],
  roleMenu: [
    { name: 'Home', link: '/', submenu: [] },
    // { name: 'Report', link: '', submenu: [
    //   {subname: 'Earnings', sublink: '/report/earnings/'},
    //   // [TINKER:ROLEMENU:report]
    // ]},
    { name: 'Config', link: '', submenu: [
      {subname: 'User', sublink: '/config/user'},
      {subname: 'Role', sublink: '/config/role'},
      // [TINKER:ROLEMENU:config]
    ]},
    { name: 'Master', link: '', submenu: [
      {subname: 'Branch', sublink: '/master/branch/'},
      // [TINKER:ROLEMENU:master]
    ]},
    // [TINKER:ROLEMENU:END]
  ],
  freeMenu: ['chgpass'],
  freeLink: [
    'main/login'
  ],
  fltype: [{value:'Dom',label:'Domestic'},{value:'Int',label:'International'}],
  localData: {
    role: { url:'/api/config/role', key:'code', value:'name' },
    branch: { url:'/api/master/branch/', key:'code', value:'name' }
  },
  locked: [{ value:'1', label:'Open' },{ value:'2', label:'Processed' },{ value:'2', label:'Done' }],
  paytipe: [{ value:'1', label:'EDC' },{ value:'2', label:'Cash' },{ value:'3', label:'Virtual Account' },{ value:'4', label:'QRIS' }],
  awsupl: {'expirations': '2025-09-30T12:00:00.000Z','bucketuri': 'https://inshopper-storage.s3.ap-southeast-3.amazonaws.com/'},
  comply: [{value:0,label:'Not Checked'},{value:-1,label:'Not Applicable'},{value:1,label:'Not Comply'},{value:2,label:'Comply'}]
};

export default config;