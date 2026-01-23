export default async()=>{
  const { Animate, initTE } = await import('tw-elements');
  var alert = {
    stack:0,
    createElement:(tipe, icon, msg)=>{
      document.getElementById('alert-wrapper').insertAdjacentHTML('beforeend',`
      <div
        id="myAlert-${alert.stack}"
        class="alert-${tipe}"
        role="alert"
        data-te-animation-init
        data-te-animation-start="manually"
        data-te-animation-reset="true"
        data-te-animation="[fade-in-right_1s_ease-in-out]"
      >
        <span class="mr-2">
          <i class="${icon}"></i>
        </span>
        ${msg}
      </div>
      `);
      initTE({ Animate }, { allowReinits: true });
      let anim = Animate.getOrCreateInstance(document.getElementById(`myAlert-${alert.stack}`));
      anim.startAnimation();

      let ctx = document.getElementById(`myAlert-${alert.stack}`);
      if(tipe=='success'){
        setTimeout(() => {
          ctx.remove();
        }, 3000);
      }

      if(tipe!='success'){
        document.getElementById(`myAlert-${alert.stack}`).addEventListener('click',()=>{
          ctx.remove();
        });
      }
    },
    success:(msg)=>{
      alert.stack++;
      alert.createElement('success','fa-solid fa-circle-check',msg);
    },
    error:(msg)=>{
      alert.stack++;
      alert.createElement('danger','fa-solid fa-circle-exclamation',msg);
    },
    info:(msg)=>{
      alert.stack++;
      alert.createElement('info','fa-solid fa-circle-exclamation',msg);
    },
  }
  return alert;
};