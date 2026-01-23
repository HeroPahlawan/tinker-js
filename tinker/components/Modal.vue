<template>
  <div
    data-te-modal-init
    class="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
    :id="modalId"
    tabindex="-1"
    aria-hidden="true">
    <div
      data-te-modal-dialog-ref
      class="pointer-events-none relative w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[650px]">
      <div
        class="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
        <div
          class="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 px-4 py-2 dark:border-opacity-50">
          <!--Modal title-->
          <h5
            class="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200"
            >
            {{ title }}
          </h5>
          <!--Close button-->
          <button
            type="button"
            class="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
            data-te-modal-dismiss
            aria-label="Close">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

        <!--Modal body-->
        <div class="relative flex-auto p-4" data-te-modal-body-ref>
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['modalId','title'],
    async mounted(){
      const { Modal,Ripple,initTE } = await import('tw-elements');
      initTE({ Modal,Ripple }, { allowReinits: true });
    }
  }
</script>