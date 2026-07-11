(async()=>{

const user = sessionStorage.getItem("login");

if(!user){
    location.href="login.html";
    return;
}

let js=document.createElement("script");

js.type="module";

js.src="https://boetepaythea-sudo.github.io/koperasi-jfn/assets/app-core.js";

document.body.appendChild(js);

})();
