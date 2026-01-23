<script setup>
  import { navTitle } from "~/stores/mystore";
</script>

<template>
<div x-data="{ cartOpen: false , isOpen: false }" class="bg-white">
    <main class="py-8">
        <div class="container-fluid mx-auto px-6">
          <Carousel :autoplay="3000" :items-to-show="2" :wrap-around="true">
            <Slide v-for="(items, index) in dataToRender.promos" :key="index">
              <div class="carousel__item w-full px-1.5 h-52">
                  <div class="h-52 rounded-md overflow-hidden bg-cover bg-center" :style="{ 'background-image':'url( '+appcfg.awsupl.bucketuri+'img/promos/'+(!items.image?'670673510b1fa7f44c805c4c/Inshopper-20241015183203.jpg':items._id+'/'+items.image[0].filename) }">
                      <div class="bg-gray-900 bg-opacity-50 flex items-center h-full">
                          <div class="px-10 max-w-xl text-left">
                              <h2 class="text-base md:text-xl lg:text-2xl text-white font-semibold">{{ items.title }}</h2>
                              <p class="hidden md:block mt-2 text-gray-400">{{ items.descr }}</p>
                              <a
                                :href="`/main/catalogue?branch=`+useRoute().query.branch+`&subcategory=`+items.keyword+`*`"
                                class="inline-block leading-loose text-body-color hover:text-primary text-white"
                              >
                              <button class="flex items-center mt-4 px-3 py-2 bg-primary text-white text-sm uppercase font-medium rounded hover:bg-primary-200 focus:outline-none focus:bg-primary-200">
                                  <span>Shop Now</span>
                                  <svg class="h-5 w-5 mx-2" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                              </button>
                            </a>
                          </div>
                      </div>
                  </div>
              </div>
            </Slide>
            <template #addons>
              <Navigation />
            </template>
          </Carousel>
            <div class="mt-5">
              <div class="grid grid-cols-12 gap-4">
                <div class="pt-5 pb-10 col-span-12 md:col-span-4">
                  <Carousel :autoplay="5000" :items-to-show="1" :wrap-around="true">
                    <Slide :key="0">
                      <div class="carousel__item w-full px-1.5 h-56">
                          <div class="h-56 rounded-md overflow-hidden bg-cover bg-center" :style="'background-image: url(/img/BlueBackdrop.jpg); background-size: cover; background-position: center;'">
                              <div class="flex items-center h-full">
                                  <div class="px-10 max-w-72 text-left">
                                      <h2 class="text-base md:text-xl lg:text-2xl text-white font-semibold">Discover exclusive deals on top-tier business products.</h2>
                                      <p class="hidden md:block mt-2 text-gray-900"></p>
                                  </div>
                              </div>
                          </div>
                      </div>
                    </Slide>
                    <Slide :key="1">
                      <div class="carousel__item w-full px-1.5 h-56">
                          <div class="h-56 rounded-md overflow-hidden bg-cover bg-center" :style="'background-image: url(/img/NavyBackdrop.jpg); background-size: cover; background-position: center;'">
                              <div class="flex items-center h-full">
                                  <div class="px-10 max-w-72 text-left">
                                      <h2 class="text-base md:text-xl lg:text-2xl text-white font-semibold">Valuable experiences for your Lifestyle needs</h2>
                                      <p class="hidden md:block mt-2 text-gray-900"></p>
                                  </div>
                              </div>
                          </div>
                      </div>
                    </Slide>
                    <Slide :key="2">
                      <div class="carousel__item w-full px-1.5 h-56">
                          <div class="h-56 rounded-md overflow-hidden bg-cover bg-center" :style="'background-image: url(/img/BlueBackdrop1.jpg); background-size: cover; background-position: center;'">
                              <div class="flex items-center h-full">
                                  <div class="px-10 max-w-72 text-left">
                                      <h2 class="text-base md:text-xl lg:text-2xl text-white font-semibold">Non-stop exclusive promos crafted for you.</h2>
                                      <p class="hidden md:block mt-2 text-gray-900"></p>
                                  </div>
                              </div>
                          </div>
                      </div>
                    </Slide>
                    <template #addons>
                      <Navigation />
                    </template>
                  </Carousel>
                </div>
                <div class="bg-white pt-5 pb-10 col-span-12 md:col-span-8">
                  <h2 class="text-gray-600 text-xl font-medium">FEATURED CATEGORIES</h2>
                  <div class="mx-auto max-w-5xl px-6 lg:px-8">
                    <div class="mx-auto max-w-lg items-center gap-x-2 gap-y-10 sm:max-w-xl sm:gap-x-2 lg:mx-0 lg:max-w-none grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      <div v-for="value in categories.label">
                        <a class="" :href="`/main/catalogue?branch=`+useRoute().query.branch+`&category=`+value.category">
                          <div class="text-center p-5 border-themes rounded-lg">
                            <img :src='getCategoryImage(value)' :alt='value.category' class="w-16 h-16 object-cover rounded-md m-auto">
                            <span class="text-gray-600 font-medium line-clamp-1">{{ value.category }}</span>
                          </div>
                        </a>
                      </div>
                    </div>
                    <div class="relative mt-6 w-full mx-auto">
                      <span class="absolute inset-y-0 left-0 pl-3 flex items-center">
                        <svg class="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none">
                          <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </span>
                      <input v-model="searchq" class="w-full border-solid border-2 border-grey rounded-md pl-10 pr-10 py-2 focus:border-primary focus:outline-none focus:shadow-outline" type="text" placeholder="Cari berdasarkan nama atau tags" v-on:keyup.enter="searchproduct()">
                      <button v-if="searchq" @click="searchq = ''" class="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer hover:text-primary">
                        <svg class="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bg-white pt-5 pb-10">
                <div class="flex items-center justify-between">
                  <div>
                    <h2 v-if="!useRoute().query.categories" class="text-gray-600 text-xl font-medium">DEALS FOR YOU</h2>
                    <h2 v-else class="text-gray-600 text-xl font-medium">PILIHAN TERBAIK UNTUK KEBUTUHAN <span class="inline-flex items-center rounded bg-primary mx-1 px-2 py-1 font-bold text-white ring-1 ring-inset ring-primary">{{ useRoute().query.categories.toUpperCase() }}</span> ANDA</h2>
                  </div>
                  <div v-if="searchq" class="text-sm text-gray-500">
                    <span>{{ filteredProducts.length }} produk ditemukan</span>
                    <button @click="searchq = ''" class="ml-2 text-primary hover:text-primary-200 font-medium">
                      Clear
                    </button>
                  </div>
                </div>

                <!-- No Results Message -->
                <div v-if="filteredProducts.length === 0 && searchq" class="flex flex-col items-center justify-center py-16">
                  <svg class="h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                  <h3 class="text-xl font-medium text-gray-600 mb-2">Tidak ada produk ditemukan</h3>
                  <p class="text-gray-500">Coba kata kunci yang berbeda</p>
                </div>

                <div v-else class="grid gap-6 grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-6">
                    <div v-for="docs in dataToRender.docs">
                        <div class="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden min-h-[300px] lg:min-h-[400px] border-themes" @click="seeproduct(docs._id)">
                            <div class="flex items-end justify-end h-56 w-full bg-cover" v-bind:style='{ backgroundImage: "url("+ getProductImage(docs) +")",}'>
                                <button class="p-2 rounded-full bg-primary text-white mx-5 -mb-4 hover:bg-primary-200 focus:outline-none focus:bg-primary-200">
                                    <svg class="h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                                </button>
                            </div>
                            <div class="px-5 py-3">
                                <h3 class="text-xs ls:text-base text-gray-700 uppercase font-bold">{{ docs.name }}</h3>
                                <div class="mt-4 hidden sm:flex">
                                  <div v-for="(item, index) in docs.tags">
                                    <span v-if="index<=2" class="inline-flex items-center rounded-xl bg-primary-100 mx-1 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary">{{ item }}</span>
                                  </div>
                                </div>
                                <br>
                                <span class="text-gray-500 mt-2 font-bold">{{ curr(docs.types[0].price) }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Load More Button -->
                <div v-if="hasMoreProducts" class="flex justify-center mt-8">
                  <button
                    @click="loadMore"
                    class="flex items-center px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors duration-200"
                  >
                    <span>Load More Products</span>
                    <svg class="h-5 w-5 ml-2" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                </div>

                <!-- All Products Loaded Message -->
                <div v-else-if="filteredProducts.length > 0" class="flex justify-center mt-8">
                  <p class="text-gray-500 font-medium">
                    <span v-if="searchq">Semua hasil pencarian ditampilkan</span>
                    <span v-else>Semua produk ditampilkan</span>
                  </p>
                </div>
              </div>
            </div>
        </div>
    </main>
</div>
</template>

<script>
  import dayjs from "dayjs";
  import { Carousel, Navigation, Slide } from 'vue3-carousel'
  import 'vue3-carousel/dist/carousel.css'
  export default {
    data:()=>({
      alert:'', dataToRender:{}, categories:{}, searchq:'', promlen:0,
      Carousel, Slide, Navigation,
      allProducts: [], // Store all products from API
      filteredProducts: [], // Products after search filter
      displayedProducts: [], // Products currently displayed with pagination
      itemsPerPage: 15, // Number of items to load per click
      currentPage: 0, // Current page index
      searchDebounce: null // Debounce timer
    }),
    async mounted(){
      this.alert = await alert();
      const route = useRoute();
      let query = route.query;
      if(query._id){
        this._id = query._id;
      }else{
        this._id = '';
      }
      this.render();
    },
    beforeUnmount() {
      // Clean up debounce timer
      if (this.searchDebounce) {
        clearTimeout(this.searchDebounce);
      }
    },
    methods:{
      async render(){
        try {
          const route = useRoute();
          let qs=new URLSearchParams(this.$route.query).toString();
          let tsk = await call.getwoauth(`/api/main/catalogue?${qs}`);
          let prm = await call.getwoauth(`/api/master/promotions?branch=${route.query.branch}`);
          tsk.data.promos = prm.data.docs;
          this.promlen = tsk.data.promos.length;

          // Store all products
          this.allProducts = tsk.data.docs || [];

          // Initialize filtered products (no filter initially)
          this.filteredProducts = this.allProducts;

          // Initialize pagination
          this.currentPage = 0;
          this.displayedProducts = this.filteredProducts.slice(0, this.itemsPerPage);

          // Update dataToRender with displayed products
          this.dataToRender = await tsk.data;
          this.dataToRender.docs = this.displayedProducts;

          this.categories.values = await getCategories();
          // Create a map to store unique categories
          const categoryMap = new Map();
          // Iterate over the data array
          this.categories.values.forEach(item => {
            if (!categoryMap.has(item.category)) {
                categoryMap.set(item.category, item);
            }
          });
          // Convert the map values to an array and sort by category
          this.categories.label = Array.from(categoryMap.values()).sort((a, b) => a.category.localeCompare(b.category));
          loading(false);
        } catch (error) {
          loading(false);
          this.alert.error(error);
        }
      },
      async seeproduct(pid){
        const route = useRoute();
        navigateTo(`/transaction/product?branch=${route.query.branch}&_id=${pid}`);
      },
      async searchproduct(){
        // This method is kept for Enter key compatibility
        this.performSearch();
      },
      filterProducts() {
        // Clear existing debounce timer
        if (this.searchDebounce) {
          clearTimeout(this.searchDebounce);
        }

        // Set new debounce timer (300ms delay)
        this.searchDebounce = setTimeout(() => {
          this.performSearch();
        }, 300);
      },
      performSearch() {
        const query = this.searchq.toLowerCase().trim();

        if (!query) {
          // No search query, show all products
          this.filteredProducts = this.allProducts;
        } else {
          // Filter products by name and tags
          this.filteredProducts = this.allProducts.filter(product => {
            // Check if name matches
            const nameMatch = product.name.toLowerCase().includes(query);

            // Check if any tag matches
            const tagMatch = product.tags && product.tags.some(tag =>
              tag.toLowerCase().includes(query)
            );

            return nameMatch || tagMatch;
          });
        }

        // Reset pagination to show first page of filtered results
        this.currentPage = 0;
        this.displayedProducts = this.filteredProducts.slice(0, this.itemsPerPage);
        this.dataToRender.docs = this.displayedProducts;
      },
      getProductImage(product) {
        if (product.image && product.image.length > 0 && product.image[0].filename) {
          return `${appcfg.awsupl.bucketuri}img/${product._id}/${product.image[0].filename}`;
        }
        return `${appcfg.awsupl.bucketuri}`+'img/placeholder.jpg'; // Default placeholder image
      },
      getCategoryImage(category) {
        if (category.image && category.image.length > 0 && category.image[0].filename) {
          return `${appcfg.awsupl.bucketuri}img/categories/${category._id}/${category.image[0].filename}`;
        }
        return `${appcfg.awsupl.bucketuri}`+'img/placeholder.jpg'; // Default placeholder image
      },
      category_icon(ctg) {

      },
      loadMore() {
        // Increment page
        this.currentPage++;

        // Calculate new slice bounds (using filteredProducts now)
        const start = 0;
        const end = (this.currentPage + 1) * this.itemsPerPage;

        // Update displayed products from filtered list
        this.displayedProducts = this.filteredProducts.slice(start, end);
        this.dataToRender.docs = this.displayedProducts;
      }
    },
    computed:{
      hasMoreProducts() {
        return this.displayedProducts.length < this.filteredProducts.length;
      }
    },
    watch: {
      searchq(newVal, oldVal) {
        // Trigger debounced search when search query changes
        this.filterProducts();
      }
    }
  }
</script>

