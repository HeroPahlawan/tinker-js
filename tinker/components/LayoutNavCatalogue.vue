<script setup>
  import { navTitle } from "~/stores/mystore";
  import { useCartStore } from "~/stores/cart";
  const cartStore = useCartStore();
</script>

<template>
    <div class="bg-gradient-to-r from-[#192445] to-[#0e658a] pb-5">
        <header>
            <div class="container mx-auto px-6 py-3">
                <div class="flex items-center justify-between">
                    <div class="hidden w-full text-gray-600 md:flex md:items-center">
                        <img src="/img/iash.png" class="w-20 h-auto" alt="iash-logo">
                        <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.2721 10.2721C16.2721 12.4813 14.4813 14.2721 12.2721 14.2721C10.063 14.2721 8.27214 12.4813 8.27214 10.2721C8.27214 8.06298 10.063 6.27212 12.2721 6.27212C14.4813 6.27212 16.2721 8.06298 16.2721 10.2721ZM14.2721 10.2721C14.2721 11.3767 13.3767 12.2721 12.2721 12.2721C11.1676 12.2721 10.2721 11.3767 10.2721 10.2721C10.2721 9.16755 11.1676 8.27212 12.2721 8.27212C13.3767 8.27212 14.2721 9.16755 14.2721 10.2721Z" fill="white" /><path fill-rule="evenodd" clip-rule="evenodd" d="M5.79417 16.5183C2.19424 13.0909 2.05438 7.39409 5.48178 3.79417C8.90918 0.194243 14.6059 0.054383 18.2059 3.48178C21.8058 6.90918 21.9457 12.6059 18.5183 16.2059L12.3124 22.7241L5.79417 16.5183ZM17.0698 14.8268L12.243 19.8965L7.17324 15.0698C4.3733 12.404 4.26452 7.97318 6.93028 5.17324C9.59603 2.3733 14.0268 2.26452 16.8268 4.93028C19.6267 7.59603 19.7355 12.0268 17.0698 14.8268Z" fill="white" />
                        </svg>
                        <span class="mx-1 text-sm text-white">{{ branch.code }}</span>
                    </div>
                    <div class="w-full text-gray-700 md:text-center text-2xl font-semibold">
                        <div class="m-auto w-fit">
                            <div class="flex items-center mb-3">
                                <img src="/img/Inshopper.png" alt="InShopper Logo" class="h-12 md:h-14 w-auto" />
                                <h1 class="text-xl md:text-2xl text-white font-bold pl-3">InShopper</h1>
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center justify-end w-full">
                        <button @click="cartOpen = !cartOpen" class="flex text-gray-600 focus:outline-none mx-4 sm:mx-0" id="navbtn">
                            <svg class="h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="white">
                                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                            </svg>
                            <span v-if="useCartStore().cart.length > 0" class="relative flex h-3 w-3">
                                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-danger opacity-75"></span>
                                <span class="relative inline-flex rounded-full h-3 w-3 bg-danger-500"></span>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="container-fluid mx-auto px-6">
                <nav class="relative flex w-full items-center justify-between bg-primary py-2 shadow-dark-mild dark:bg-primary lg:flex-wrap lg:justify-start rounded-lg" data-te-navbar-ref>
                    <div class="px-6">
                        <button
                        class="block border-0 bg-transparent px-2 text-white hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
                        type="button"
                        data-te-collapse-init
                        data-te-target="#navbarSupportedContent1"
                        aria-controls="navbarSupportedContent1"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span
                            class="[&>svg]:w-7 [&>svg]:stroke-white dark:[&>svg]:stroke-white">
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor">
                            <path
                                fill-rule="evenodd"
                                d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                                clip-rule="evenodd" />
                            </svg>
                        </span>
                        </button>
                        <div
                        class="!visible hidden flex-grow basis-[100%] items-center lg:!flex lg:basis-auto"
                        id="navbarSupportedContent1"
                        data-te-collapse-item>
                        <ul class="me-auto lg:flex lg:flex-row" data-te-navbar-nav-ref>
                            <li data-te-nav-item-ref>
                                <a class="block py-2 pe-2 text-white transition duration-200 hover:text-white hover:ease-in-out focus:text-white active:text-white motion-reduce:transition-none dark:text-white dark:hover:text-white dark:focus:text-white dark:active:text-white lg:px-3" :href="`/main/catalogue?branch=`+branch.code" >
                                    Home
                                </a>
                            </li>
                            <li class="static" data-te-nav-item-ref data-te-dropdown-ref>
                                <a class="flex items-center whitespace-nowrap py-2 pe-2 text-white transition duration-200 hover:text-white hover:ease-in-out focus:text-white active:text-white motion-reduce:transition-none dark:text-white dark:hover:text-white dark:focus:text-white dark:active:text-white lg:px-3" href="#" type="button" id="dropdownMenuButtonX" data-te-dropdown-toggle-ref aria-expanded="false" data-te-nav-link-ref>
                                    Categories
                                    <span class="ms-2 [&>svg]:h-5 [&>svg]:w-5">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor">
                                        <path
                                        fill-rule="evenodd"
                                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                        clip-rule="evenodd" />
                                    </svg>
                                    </span>
                                </a>
                                <div
                                    class="absolute left-0 right-0 top-full z-[1000] mt-0 hidden w-full border-none bg-white bg-clip-padding shadow-lg data-[te-dropdown-show]:block dark:bg-neutral-700"
                                    aria-labelledby="dropdownMenuButtonX"
                                    data-te-dropdown-menu-ref>
                                    <div class="px-6 py-5 lg:px-8">
                                        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                                            <div v-for="menu in cmenu" :key="menu.title" >
                                                <h4 class="text-lg font-semibold mb-1">{{ menu.title }}</h4>
                                                <a  v-for="item in menu.items"
                                                    :href="`/main/catalogue?branch=`+branch.code+`&subcategory=`+item.text+`*`"
                                                    aria-current="true"
                                                    class="transition ease-in-out delay-150 block w-full border-b rounded border-neutral-100 bg-white px-6 py-2 text-neutral-700 hover:bg-primary hover:text-white focus:bg-primary focus:text-white focus:outline-none active:bg-primary active:tesxt-white active:no-underline dark:border-white/10 dark:bg-surface-dark dark:text-white dark:hover:bg-primary dark:focus:bg-primary dark:active:bg-primary"
                                                    >{{ item.text }}</a
                                                >
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li data-te-nav-item-ref>
                                <a class="block py-2 pe-2 text-white transition duration-200 hover:text-white hover:ease-in-out focus:text-white active:text-white motion-reduce:transition-none dark:text-white dark:hover:text-white dark:focus:text-white dark:active:text-white lg:px-3" href="#footer" >
                                    About Us
                                </a>
                            </li>
                            <li data-te-nav-item-ref>
                                <a class="block py-2 pe-2 text-white transition duration-200 hover:text-white hover:ease-in-out focus:text-white active:text-white motion-reduce:transition-none dark:text-white dark:hover:text-white dark:focus:text-white dark:active:text-white lg:px-3" href="#footer" >
                                    Contact
                                </a>
                            </li>
                        </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
        <div :class="cartOpen ? 'translate-x-0 ease-out' : 'translate-x-full ease-in'" class="fixed right-0 top-0 max-w-xs w-full h-full px-6 py-4 transition duration-300 transform overflow-y-auto bg-white border-l-2 border-gray-300 z-50">
            <div class="flex items-center justify-between">
                <h3 class="text-2xl font-medium text-gray-700">Your cart</h3>
                <button @click="cartOpen = !cartOpen" class="text-gray-600 focus:outline-none">
                    <svg class="h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
            <hr class="my-3">
            <div v-if="useCartStore().cart.length > 0" class="mt-6">
                <div v-for="(value, index) in useCartStore().cart" class="mt-6 flex">
                    <img class="h-32 w-20 object-cover rounded" :src="value.item.image" alt="cart image">
                    <div class="mx-3">
                        <h3 class="text-gray-600">{{ value.item.name }}</h3>
                        <span class="text-gray-600">Type : {{ value.item.type }}</span>
                        <div class="flex items-center mt-2">
                            <button class="text-gray-500 focus:outline-none focus:text-gray-600">
                                <svg class="h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </button>
                            <span class="text-gray-700 mx-2">{{ value.item.qty }}</span>
                            <button class="text-gray-500 focus:outline-none focus:text-gray-600">
                                <svg class="h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </button>
                        </div>
                        <span class="text-gray-600">Total : </span><span class="text-gray-600 subtotalcount">{{ value.item.subtotal }}</span>
                    </div>
                    <button @click="removeitem(index)" class="text-gray-600">
                        <svg fill="#dc5050" width="25px" height="25px" viewBox="-1.7 0 20.4 20.4" xmlns="http://www.w3.org/2000/svg" class="cf-icon-svg" stroke="#dc5050"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M16.417 10.283A7.917 7.917 0 1 1 8.5 2.366a7.916 7.916 0 0 1 7.917 7.917zm-6.804.01 3.032-3.033a.792.792 0 0 0-1.12-1.12L8.494 9.173 5.46 6.14a.792.792 0 0 0-1.12 1.12l3.034 3.033-3.033 3.033a.792.792 0 0 0 1.12 1.119l3.032-3.033 3.033 3.033a.792.792 0 0 0 1.12-1.12z"></path></g></svg>
                    </button>
                </div>
                <div class="mt-6 text-xl font-bold tracking-tight">
                    <h2>Total purchase: {{ curr(grtotal) }}</h2>
                </div>
            </div>
            <!-- <div class="mt-8">
                <form class="flex items-center justify-center">
                    <input class="form-input w-48" type="text" placeholder="Add promocode">
                    <button class="ml-3 flex items-center px-3 py-2 bg-blue-600 text-white text-sm uppercase font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                        <span>Apply</span>
                    </button>
                </form>
            </div> -->
            <a class="flex items-center justify-center mt-4 px-3 py-2 bg-primary text-white text-sm uppercase font-medium rounded hover:bg-primary focus:outline-none focus:bg-primary cursor-pointer" @click="myModal.toggle()">
                <span>Checkout</span>
                <svg class="h-5 w-5 mx-2" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </a>
        </div>
    </div>

    <Modal id="myModal" title="Checkout">
        <p>Rincian Pembelanjaan</p>
        <br class="my-3">
        <div v-if="useCartStore().cart.length > 0" class="mt-6">
            <div v-for="(value, index) in useCartStore().cart" class="mt-6 grid grid-cols-12 w-full">
                <div class="col-span-8 flex">
                    <img class="h-32 w-20 object-cover rounded" :src="value.item.image" alt="cart image">
                    <div class="mx-3">
                        <h3 class="text-gray-600">{{ value.item.name }}</h3>
                        <span class="text-gray-600">Type : {{ value.item.type }}</span>
                        <div class="flex items-center mt-2">
                            <button class="text-gray-500 focus:outline-none focus:text-gray-600">
                                <svg class="h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </button>
                            <span class="text-gray-700 mx-2">{{ value.item.qty }}</span>
                            <button class="text-gray-500 focus:outline-none focus:text-gray-600">
                                <svg class="h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </button>
                        </div>
                        <span class="text-gray-600">Price : {{ curr(value.item.price) }}</span><br>
                        <span class="text-gray-600">Total : {{ curr(value.item.subtotal) }}</span>
                    </div>
                </div>
                <div class="col-span-4 flex justify-end">
                    <button @click="removeitem(index)" class="text-gray-600 float-right">
                        <svg fill="#dc5050" width="25px" height="25px" viewBox="-1.7 0 20.4 20.4" xmlns="http://www.w3.org/2000/svg" class="cf-icon-svg" stroke="#dc5050"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M16.417 10.283A7.917 7.917 0 1 1 8.5 2.366a7.916 7.916 0 0 1 7.917 7.917zm-6.804.01 3.032-3.033a.792.792 0 0 0-1.12-1.12L8.494 9.173 5.46 6.14a.792.792 0 0 0-1.12 1.12l3.034 3.033-3.033 3.033a.792.792 0 0 0 1.12 1.119l3.032-3.033 3.033 3.033a.792.792 0 0 0 1.12-1.12z"></path></g></svg>
                    </button>
                </div>
            </div>
            <br>
            <Input type="text" name="buyername" label="Nama" class="col-span-12 md:col-span-12 xl:col-span-12" />
            <Input type="text" name="phone" label="No. telp" class="col-span-12 md:col-span-12 xl:col-span-12" />
            <Input type="text" name="email" label="e-mail" class="col-span-12 md:col-span-12 xl:col-span-12" />
            <div class="mt-6 text-l font-bold tracking-tight text-right">
                <h2>Subtotal: {{ curr(grtotal) }}</h2>
                <h2>Tax: {{ curr(grtotal*0.11) }}</h2>
                <h2>Subtotal: {{ curr(grtotal+(grtotal*0.11)) }}</h2>
            </div>
            <div class="my-6 text-xl font-bold tracking-tight text-right">
                <h2>Grand Total: {{ curr(grtotal+(grtotal*0.11)) }}</h2>
            </div>
        </div>
        <div class="my-3 p-3">
            <p>Dengan melanjutkan, saya setuju dengan syarat dan ketentuan Inshopper yang berlaku</p>
        </div>
        <div class="flex flex-wrap items-center justify-end">
            <button @click="trxcheckout()" type="button" class="flex w-full items-center justify-center rounded-md border border-transparent bg-primary px-8 py-3 text-base font-medium text-white hover:bg-primary focus:outline-none focus:ring-2 focus:ring-shadow focus:ring-offset-2">
                <i class="fa-solid fa-shopping-cart fa-xl mr-2"></i>
                Buat Pesanan
            </button>
        </div>
    </Modal>
    <div id="alert-wrapper" class="fixed z-50 top-0 right-0 mt-5 mx-5 flex flex-col max-w-lg"></div>
    <div id="loading-overlay" style="display: none;" class="w-full h-full fixed top-0 left-0 bg-neutral-950 opacity-75 z-[2000]">
        <div class="flex justify-center items-center mt-[50vh]">
            <i class="fa-solid fa-circle-notch fa-2xl animate-spin text-white"></i>
            <span id="loading-text" class="ml-5 text-xl text-white font-bold">Loading ...</span>
        </div>
    </div>
</template>
<script>
  import dayjs from "dayjs";
  import { Carousel, Slide } from 'vue3-carousel';
  export default {
    data:()=>({
      alert:'', cartOpen: false, isOpen: false, grtotal:0, myModal:'', branch:{}, cmenu:{}
    }),
    name: 'Gallery',
    components: {
      Carousel,
      Slide
    },
    async mounted(){
      this.alert = await alert();
      const { Modal,Collapse,Dropdown,Ripple,initTE } = await import('tw-elements');
      initTE({ Modal,Collapse,Dropdown,Ripple });
      this.myModal = new Modal(document.getElementById('myModal'), {});
      this.grtotal = calcgrtotal();
      this.getbranch();
      var cvalues = await getCategories();
      this.cmenu = cvalues.reduce((acc, item) => {
      let category = acc.find(cat => cat.title === item.category);
      if (!category) {
        category = { title: item.category, items: [] };
        acc.push(category);
      }
      category.items.push({ text: item.subcategory, link: 'javascript:void(0)' });
      return acc;
      }, []);
    },
    async updated(){
      this.grtotal = calcgrtotal();
    },
    methods:{
      slideTo(val) {
        this.currentSlide = val
      },
      async getbranch(){
        let br='';let res='';
        try{
        const route = useRoute();
        br=route.query.branch;
        res = await call.getwoauth(`/api/master/branches?code=${br}`);
        this.branch = await res.data['docs'][0];
        } catch (error) {
          this.branch = error;
        }
      },
      async trxcheckout(){
        if (confirm("Checkout pesanan? Pastikan data sudah benar") == true) {
            loading(true);
            try {
            let dat = new FormData();
            const route = useRoute();
            const trannbr = await getTrannbr(route.query.branch);
            dat.append("buyername", document.getElementById('buyername').value);
            dat.append("phone", document.getElementById('phone').value);
            dat.append("email", document.getElementById('email').value);
            dat.append("trannbr", trannbr);
            dat.append("trstatus", 1);
            dat.append("branch", this.branch._id);
            dat.append("subtotal", this.grtotal);
            dat.append("tax", this.grtotal*0.11);
            dat.append("total", this.grtotal+(this.grtotal*0.11));
            useCartStore().cart.forEach((detail, index) => {
                Object.keys(detail.item).forEach(key => {
                    dat.append(`detail[${index}]['item'][${key}]`, detail.item[key]);
                });
            });
            dat.append("createDate", dayjs().format('YYYY-MM-DD HH:mm:ss'));
            let res = '';
            res = await call.postwoauth(`/api/transaction/checkout`, dat);
            if(res.status.code == 200){
                document.getElementById(`navbtn`).click();
                this.myModal.toggle();
                this.alert.success('Berhasil checkout pesanan');
                localStorage.removeItem('cart');
                useCartStore().emptyCart();
            }else{
                this.alert.error(res.status.message);
            }
            } catch (err) {
            this.alert.error(err);
            }
            loading(false);
        } else {
            this.alert.error('Gagal checkout item');
        } 
      },
      async removeitem(index){
        if (confirm("Apakah anda yakin menghapus item?") == true) {
            useCartStore().remFromCart(index);
            this.alert.info('Berhasil menghapus item');
        } else {
            this.alert.error('Gagal menghapus item');
        }      
      }
    },
    computed:{ 
    }
  }
</script>