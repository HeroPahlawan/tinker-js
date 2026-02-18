const config = {
  appName: 'Tinker',
  apiUrl: 'http://localhost:5001',
  //fileUrl: 'https://wheybhwfga.execute-api.ap-southeast-3.amazonaws.com/dev/inshopper-storage/',
  realm: '350pr3a1m',
  menu: [
    { name: 'Home', icon: 'fa-solid fa-house', link: '/', submenu: [] },
    { name: 'Transaction', icon: 'fa-solid fa-shopping-cart', link: '', submenu: [
      {subname: 'Transactions List', sublink: '/transaction/purchases'},
      {subname: 'Inventory List', sublink: '/transaction/inventory'},
    ]},
    // { name: 'Report (Beta)', icon: 'fa-solid fa-calculator', link: '', submenu: [
    //   {subname: 'Earnings', subicon: 'fa-regular fa-circle', sublink: '/report/earnings/'},
    // ]},
    { name: 'Config', icon: 'fa-solid fa-gear', link: '', submenu: [
      {subname: 'User', subicon: 'fa-regular fa-user', sublink: '/config/user/'},
      {subname: 'Role', subicon: 'fa-regular fa-user', sublink: '/config/role/'},
    ]},
    { name: 'Master', icon: 'fa-solid fa-folder', link: '', submenu: [
      {subname: 'Branches', subicon: 'fa-regular fa-circle', sublink: '/master/branches/'},
      {subname: 'Tenant', subicon: 'fa-regular fa-circle', sublink: '/master/company/'},
      {subname: 'Promotion', subicon: 'fa-regular fa-circle', sublink: '/master/promotions/'},
      {subname: 'Categories', subicon: 'fa-regular fa-circle', sublink: '/master/categories/'},
    ]},
  ],
  roleMenu: [
    { name: 'Home', link: '/', submenu: [] },
    { name: 'Transaction', link: '', submenu: [
      {subname: 'Transactions List', sublink: '/transaction/purchases'},
      {subname: 'Inventory List', sublink: '/transaction/inventory'},
    ]},
    // { name: 'Report', link: '', submenu: [
    //   {subname: 'Earnings', sublink: '/report/earnings/'},
    // ]},
    { name: 'Config', link: '', submenu: [
      {subname: 'User', sublink: '/config/user'},
      {subname: 'Role', sublink: '/config/role'},
    ]},
    { name: 'Master', link: '', submenu: [
      {subname: 'Branches', sublink: '/master/branches/'},
      {subname: 'Tenant', sublink: '/master/company/'},
      {subname: 'Promotions', sublink: '/master/promotions/'},
      {subname: 'Categories', sublink: '/master/categories/'},
    ]},
  ],
  freeMenu: ['chgpass'],
  freeLink: [
    'main/login',
    'transaction/product'
  ],
  fltype: [{value:'Dom',label:'Domestic'},{value:'Int',label:'International'}],
  localData: {
    role: { url:'/api/config/role/', key:'code', value:'name' },
    employee: { url:'/api/master/employee/', key:'no_ktp', value:'name' },
    branch: { url:'/api/master/branches/', key:'code', value:'name' },
    company: { url:'/api/master/company/', key:'_id', value:'name' },
    categories: { url:'/api/master/categories/', key:'_id', value:'category' },
    subcategories: { url:'/api/master/categories/', key:'_id', value:'subcategory' },
  },
  locked: [{ value:'1', label:'Open' },{ value:'2', label:'Processed' },{ value:'2', label:'Done' }],
  paytipe: [{ value:'1', label:'EDC' },{ value:'2', label:'Cash' },{ value:'3', label:'Virtual Account' },{ value:'4', label:'QRIS' }],
  awsupl: {'expirations': '2025-09-30T12:00:00.000Z','bucketuri': 'https://inshopper-storage.s3.ap-southeast-3.amazonaws.com/'},
  comply: [{value:0,label:'Not Checked'},{value:-1,label:'Not Applicable'},{value:1,label:'Not Comply'},{value:2,label:'Comply'}]
};

export default config;