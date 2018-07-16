function validateForm() {
  console.log("i am valdint lajflasfouahslfoi");
  if (document.forms["regform"]["firstnamecheck"].value === "")
  {
      console.log("false valid");
      return false;
  }
  else{
    console.log("true valid");

    return true;
  }
}