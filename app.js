function myfunction(){
    var show = document.getElementById('Password');
    if(show.type==='password'){
        show.type='text';
    }
    else{
        show.type='password';
    }
}