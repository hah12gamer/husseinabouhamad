function today(){
   document.getElementById("aDate").min = new Date().toISOString().split("T")[0];
   const max=new Date();
   max.setMonth(max.getMonth()+1);
   document.getElementById("aDate").max = max.toISOString().split("T")[0];

}
function createAppointment(){
    const to = document.getElementById("email").value;
    fetch("/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to,
        subject: "Test Email",
        message: "Hello from frontend!",
      }),
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));
    
    

}
function setBarber(barber){
    const select=barber.toISOString;
    const barberSelect=document.getElementById("barberSelect");
    barberSelect.value=select;
}