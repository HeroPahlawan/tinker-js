<template>
<div id="alert-wrapper" class="fixed z-50 top-0 right-0 mt-5 mx-5 flex flex-col max-w-lg"></div>
<div class="bg-white"> 
    <main class="py-8">
      <nav aria-label="Breadcrumb">
        <ol role="list" class="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <li>
            <div class="flex items-center">
              <p class="mr-2 text-sm font-medium text-gray-900">Product</p>
              <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" aria-hidden="true" class="h-5 w-4 text-gray-300">
                <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
              </svg>
            </div>
          </li>
          <li class="text-sm">
            <p aria-current="page" class="font-medium text-gray-500 hover:text-gray-600">{{ dataToRender.name }}</p>
          </li>
        </ol>
      </nav>
      <div class="container mx-auto px-1 sm:px-4 lg:px-6 grid grid-cols-12 gap-4">
        <div class="col-span-12 md:col-span-5 xl:col-span-5">
          <div>
            <Carousel id="gallery" :items-to-show="1" :wrap-around="false" v-model="currentSlide" class="w-full min-h-[300px]">
              <Slide v-for="slide in imageCount" :key="slide">
                <div class="carousel__item p-5 w-full h-[500px]">
                  <img :src='getProductImageByIndex(slide-1)' :alt='dataToRender.name' class="w-full h-full object-cover rounded-md">
                </div>
              </Slide>
            </Carousel>
            <Carousel id="thumbnails" :items-to-show="4" :wrap-around="true" v-model="currentSlide" ref="carousel" class="w-full object-cover">
              <Slide v-for="slide in imageCount" :key="slide">
                <div class="carousel__item p-2 h-32 w-32" @click="slideTo(slide - 1)">
                  <img :src='getProductImageByIndex(slide-1)' :alt='dataToRender.name' class="w-full h-full object-cover rounded-md">
                </div>
              </Slide>
            </Carousel>
          </div>
        </div>
        <div class="col-span-12 md:col-span-7 xl:col-span-7 px-5">
          <div class="py-10 lg:col-span-2 lg:col-start-1 lg:pb-16 lg:pr-8 lg:pt-6">
            <div class="lg:col-span-2 lg:pr-8">
              <h1 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{{ dataToRender.name }}</h1>
              <p v-if="dataToRender.types!=null" class="text-3xl tracking-tight text-gray-900">{{ curr(dataToRender.types[0].price) }}</p>
              <br>
            </div>
            <!-- Description and details -->
            <div>
              <h3 class="text-sm font-medium text-gray-900">Description</h3>

              <div class="space-y-6">
                <p class="text-base text-gray-900">{{ dataToRender.desc }}</p>
              </div>
            </div>

            <div class="mt-10">
              <h3 class="text-sm font-medium text-gray-900">Tags</h3>

              <div class="mt-4 flex">
                <div v-for="(item, index) in dataToRender.tags">
                  <span class="inline-flex items-center rounded-xl bg-primary-100 mx-1 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary">{{ item }}</span>
                </div>
              </div>
            </div>
            <!-- Sizes -->
            <form id="myForm">
              <div class="mt-10">
                <div class="flex items-center justify-between">
                  <h3 class="text-sm font-medium text-gray-900">Size</h3>
                </div>
                <fieldset aria-label="Choose a size" class="mt-4">
                  <Input type="text" name="product_id" label="product_id" :value="dataToRender._id" style="display:none;"/>
                  <div class="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-8">
                    <div v-for="types in dataToRender.types">
                      <label :class="[types.qty==0 ? 'cursor-not-allowed bg-gray-50 text-gray-200' : 'cursor-pointer bg-white text-gray-900 shadow-sm', activetype==types.type ? 'ring-2 ring-primary' : '', 'group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6']">
                        <input type="radio" name="size-choice" v-model="activetype" :value="types.type" class="sr-only">
                        <span>{{ types.type }}</span>
                        <span class="pointer-events-none absolute -inset-px rounded-md active:border checked:border-primary" aria-hidden="true"></span>
                      </label>
                    </div>
                  </div>
                  <br>
                  <div class="flex items-center justify-between">
                    <h3 class="text-sm font-medium text-gray-900">Quantity</h3>
                    <span v-if="activetype" class="text-sm" :class="availableStockForSelectedType > 0 ? 'text-gray-500' : 'text-red-500'">
                      Stok: {{ availableStockForSelectedType }} unit
                    </span>
                  </div>
                  <div class="grid grid-cols-4 gap-4 sm:grid-cols-4 lg:grid-cols-4">
                    <div class="flex items-center mt-2">
                        <span @click="increaseQty()" class="cursor-pointer text-gray-500 focus:outline-none focus:text-gray-600 hover:text-primary">
                            <svg class="h-7 w-7" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </span>
                        <span class="text-gray-700 mx-2">{{ qty }}</span>
                        <span @click="decreaseQty()" class="cursor-pointer text-gray-500 focus:outline-none focus:text-gray-600 hover:text-primary">
                            <svg class="h-7 w-7" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </span>
                    </div>
                  </div>
                </fieldset>
              </div>
              <button @click="addpurchase()" type="button" class="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-primary px-8 py-3 text-base font-medium text-white hover:bg-primary focus:outline-none focus:ring-2 focus:ring-shadow focus:ring-offset-2">ADD TO CART</button>
            </form>
          </div>
        </div>
      </div>
    </main>
    <div id="alert-wrapper" class="fixed z-50 top-0 right-0 mt-5 mx-5 flex flex-col max-w-lg"></div>
    <div id="loading-overlay" style="display: none;" class="w-full h-full fixed top-0 left-0 bg-neutral-950 opacity-75 z-[2000]">
        <div class="flex justify-center items-center mt-[50vh]">
            <i class="fa-solid fa-circle-notch fa-2xl animate-spin text-white"></i>
            <span id="loading-text" class="ml-5 text-xl text-white font-bold">Loading ...</span>
        </div>
    </div>
</div>
</template>

<script>
  import dayjs from "dayjs";
  import { Carousel, Slide } from 'vue3-carousel';
  export default {
    data:()=>({
      _id:'', alert:'', dataToRender:{}, activetype:'', qty:1, currentSlide: 0, grtotal:0
    }),
    name: 'Gallery',
    components: {
      Carousel,
      Slide
    },
    async mounted(){
      this.alert = await alert();
      const route = useRoute()
      let query = route.query;
      if(query._id){
        this._id = query._id;
      }else{
        this._id = '';
      }
      this.render();
    },
    methods:{
      async render(){
        try {
          let tsk = await call.getprmwoauth(`/api/transaction/product/${this.$route.query._id}`);
          this.dataToRender = await tsk.data;
        //   console.log(this.dataToRender.docs[0]);
        } catch (error) {
          loading(false);
          this.alert.error(error);
        }
      },
      getProductImageByIndex(index) {
        if (this.dataToRender.image && this.dataToRender.image.length > index && this.dataToRender.image[index].filename) {
          return `${appcfg.awsupl.bucketuri}img/${this.dataToRender._id}/${this.dataToRender.image[index].filename}`;
        }
        return `${appcfg.awsupl.bucketuri}img/placeholder.jpg`; // Default placeholder image
      },
      slideTo(val) {
        this.currentSlide = val
      },
      increaseQty() {
        if (!this.activetype) {
          this.alert.error('Mohon pilih varian / tipe terlebih dahulu');
          return;
        }
        if (this.qty < this.availableStockForSelectedType) {
          this.qty++;
        } else {
          this.alert.error(`Maksimal stok tersedia: ${this.availableStockForSelectedType} unit`);
        }
      },
      decreaseQty() {
        if (this.qty > 1) {
          this.qty--;
        }
      },
      addpurchase(){
        const form = document.getElementById('myForm');
        const radios = form.querySelectorAll('input[type="radio"]');
        let isSelected = false;
        radios.forEach(radio => {
          if (radio.checked) {
            isSelected = true;
          }
        });
        if (!isSelected) {
          this.alert.error('Mohon pilih varian / tipe terlebih dahulu');
        }else{
          // Check stock availability for selected type
          let availableStock = 0;
          for(const [k,v] of Object.entries(this.dataToRender.types)){
            if(v.type == this.activetype){
              availableStock = v.qty;
              break;
            }
          }

          // Validate requested quantity against available stock
          if(this.qty > availableStock){
            this.alert.error(`Stok tidak mencukupi. Stok tersedia: ${availableStock} unit. Silakan kurangi jumlah pesanan.`);
            return;
          }

          if(this.qty <= 0){
            this.alert.error('Jumlah pesanan harus lebih dari 0');
            return;
          }

          if (confirm("Tambahkan item kedalam keranjang?") == true) {
          let data=[];
          data.productid=this.dataToRender._id;
          data.name=this.dataToRender.name;
          data.qty=this.qty;
          data.image=this.getProductImageByIndex(0);
          data.type=this.activetype;
          for(const [k,v] of Object.entries(this.dataToRender.types)){
            if(v.type == this.activetype){
              data.price=v.price;
            }
          }
          data.subtotal=data.price*data.qty;
          let item=Object.assign({}, data);
          useCartStore().addToCart(item);
          document.getElementById(`navbtn`).click();
          this.alert.success('Berhasil menambahkan item');
          }else{
            this.alert.error('Gagal menambahkan item');
          }
        }
      }
    },
    computed:{
      availableStockForSelectedType() {
        if (!this.activetype || !this.dataToRender.types) {
          return 0;
        }
        const selectedType = this.dataToRender.types.find(t => t.type === this.activetype);
        return selectedType ? selectedType.qty : 0;
      },
      imageCount() {
        // Return the number of images, or 1 if no images (to show placeholder)
        if (!this.dataToRender.image || this.dataToRender.image.length === 0) {
          return 1;
        }
        return this.dataToRender.image.length;
      }
    },
    watch: {
      activetype(newType) {
        // Reset quantity when type changes and ensure it doesn't exceed new stock
        if (this.qty > this.availableStockForSelectedType) {
          this.qty = Math.min(1, this.availableStockForSelectedType);
        }
      }
    }
  }
</script>