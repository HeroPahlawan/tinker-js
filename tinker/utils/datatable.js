import alert from './alert.js';

const te_table = async (el)=>{
  const { Datatable, Collapse, Input, Select, initTE } = await import("tw-elements");
  initTE({ Datatable }, { allowReinits: true });
  const myAlert = await alert();

  var state;
  var TBL={
    option:{
      title:'', url:'', actions:false, columns:[], onRowclick:false, limit:500, perPage:10, order:false,
      filtered:{}, search:'', payload:false, customRender:false
    },
    init:(param)=>{
      TBL.option = Object.assign(TBL.option,param);
      TBL.createHeader();
      state = new Datatable(
        document.getElementById(`render-${el}`),
        { columns: TBL.option.columns },
        {
          loading: true,
          clickableRows: true,
          // fullPagination: true,
          entries: TBL.option.perPage,
          entriesOptions: [5,10,20,50,100],
          loadingMessage: 'Loading data...',
          noFoundMessage: 'No data found',
          sortField: TBL.option.order[0] ?? '',
          sortOrder: TBL.option.order[1] ?? ''
        }
      );
      TBL.fetchData();
    },
    update:(param)=>{
      TBL.option = Object.assign(TBL.option,param);
      TBL.fetchData();
    },
    createHeader:()=>{
      document.getElementById(el).innerHTML = `
        <div class="card !p-1">
          <nav class="relative flex w-full items-center justify-between bg-[#FBFBFB] text-neutral-500 mt-2 focus:text-neutral-700 dark:bg-neutral-600">
            <div class="ml-3">
              <button
                type="button"
                data-te-ripple-init
                data-te-ripple-color="gray"
                data-te-collapse-init
                data-te-target="#tablefilter-${el}"
                aria-expanded="false"
                aria-controls="tablefilter-${el}"
                class="inline-block rounded-full p-1 text-gray bg-neutral-300 transition duration-150 hover:text-neutral-700 ease-in-out focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                <i class="fa-solid fa-filter mx-1"></i>
              </button>
            </div>
            <div class="flex w-full flex-wrap items-center justify-between px-3">
              <div class="ml-2">
                <span class="text-xl text-neutral-800 dark:text-neutral-200" href="#">
                  ${TBL.option.title}
                </span>
              </div>
              <div id="actions-wrapper-${el}"></div>
            </div>
          </nav>
        
          <div class="!visible hidden" id="tablefilter-${el}" data-te-collapse-item>
            <div
              class="flex rounded bg-white px-4 pt-4 pb-1 dark:bg-neutral-700 dark:text-neutral-50">
              <div class="w-[150px]">
                <select data-te-select-init data-te-select-size="sm" id="filterSelect-${el}" name="filterSelect-${el}"></select>
              </div>
              <div class="w-[150px] ml-2">
                <div class="relative" data-te-input-wrapper-init>
                  <input
                    type="text" id="filterValue-${el}" name="filterValue-${el}"
                    class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.33rem] text-xs leading-[1.5] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    placeholder="Enter value" />
                </div>
              </div>
              <div class="ml-2">
                <button
                  id="btn-search-${el}"
                  type="button"
                  class="inline-block rounded bg-primary px-4 pb-[5px] pt-[6px] text-xs font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                  Search
                </button>
              </div>
              <div id="badge-wrapper-${el}" class="ml-4"></div>
            </div>
          </div>
        
          <div id="render-${el}" class="datatables">
        </div>
      `;
      initTE({ Collapse, Input, Select }, { allowReinits: true });
    },
    fetchData:async(reload=false)=>{
      state.update({}, { loading: true });
      let uri = TBL.option.url;
      TBL.option.filtered['limit'] = TBL.option.limit;
      TBL.option.search = new URLSearchParams(TBL.option.filtered).toString();
      uri += '?'+TBL.option.search;
      if(TBL.option.payload){
        uri += '&'+new URLSearchParams(TBL.option.payload).toString();
      }
      // if(TBL.option.order){
      //   uri += '&'+new URLSearchParams({orby:TBL.option.order[0],ordr:TBL.option.order[1]}).toString();
      // }
      // fetch(uri)
      // .then((response) => response.text()).then((data) => {
      //   try {
      //     let d = JSON.parse(data);
      //     state.update({
      //       rows: d.data.docs.map((mapp) => ({
      //         ...mapp
      //       })),
      //     }, { loading: false }
      //     );
      //     TBL.render(reload);
      //   } catch (error) {
      //     myAlert.error(error);
      //   }
      // });
      call.get(uri).then(d=>{
        try {
          if(d.status.code == 200){
            state.update({
              rows: d.data.docs.map((mapp) => {
                let obj = {...mapp};
                if(TBL.option.customRender){
                  let cR = TBL.option.customRender(mapp);
                  Object.assign(obj, cR);
                }
                return obj;
              }),
            }, { loading: false });
            TBL.render(reload);
          }else{
            myAlert.error(d.status.message);
            state.update({}, { loading: false });
          }
        } catch (error) {
          myAlert.error(error.message);
        }
      });
    },
    reload:()=>{
      TBL.fetchData(true);
    },
    addFilter:()=>{
      let col = document.getElementById(`filterSelect-${el}`).value;
      let val = document.getElementById(`filterValue-${el}`).value;
      TBL.option.filtered[col] = val;
      TBL.option.search = new URLSearchParams(TBL.option.filtered).toString();
      TBL.fetchData(true);
    },
    delFilter:(key)=>{
      delete TBL.option.filtered[key];
      TBL.option.search = new URLSearchParams(TBL.option.filtered).toString();
      TBL.fetchData(true);
    },
    render:(reload=false)=>{
      if(reload){
        // items filtered
        document.getElementById(`badge-wrapper-${el}`).innerHTML='';
        for(const [k, v] of Object.entries( TBL.option.filtered )){
          document.getElementById(`badge-wrapper-${el}`).insertAdjacentHTML('beforeend',`
            <span
              class="inline-block whitespace-nowrap rounded-full bg-primary-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-primary-700">
              <button type="button" id="badge-${el}-${k}">
                <i class="fa-solid fa-xmark mr-1 hover:cursor-pointer fa-lg"></i>
              </button>
              <span>${k}: ${v}</span>
            </span>
          `);
          (function (key) {
            document.getElementById(`badge-${el}-${key}`).addEventListener('click', function () {
              TBL.delFilter(key);
            });
          })(k);
        }
      }else{
        // click addFilter handler
        document.getElementById(`btn-search-${el}`).onclick = function(){TBL.addFilter()};

        // filter option
        TBL.option.columns.forEach((x,i) => {
          document.getElementById(`filterSelect-${el}`).insertAdjacentHTML('beforeend',`<option value="${x.field}">${x.label}</option>`);
        });

        // actions
        if(TBL.option.actions){
          TBL.option.actions.forEach((x,i) => {
            let id = btoa(x.label)+el;
            document.getElementById(`actions-wrapper-${el}`).insertAdjacentHTML('beforeend',`
              <button
                type="button"
                id="${id}"
                data-te-ripple-init
                data-te-ripple-color="gray"
                class="inline-block rounded-full px-3 py-1 mx-1 text-gray bg-neutral-300 transition duration-150 hover:text-neutral-700 ease-in-out focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                ${x.label}
              </button>
            `);
            document.getElementById(id).addEventListener('click',function(){
              TBL.option.actions[i].onclick(x.onclick);
            });
          });
        }

        // rowclick handler
        if(TBL.option.onRowclick){
          document.getElementById(`render-${el}`).addEventListener('rowClick.te.datatable', (e) => {
            TBL.option.onRowclick(e.row);
          });
        } 
      }
    }
  }
  return TBL;
}
export default te_table;