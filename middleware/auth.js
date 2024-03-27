export default ({ store, route, redirect }) => {
  if (route.path === '/guide') {
    // /guide/rentalにリダイレクト
    return redirect('/guide/rental');
  }
  // }else if (route.path.match(/individual/)) {
  //   return redirect('https://www.takenaka-co.co.jp/form/rental/admission/contact.php')
  // }else if (route.path.match(/corporate/)) {
  //   return redirect('https://www.takenaka-co.co.jp/form/rental/registration/contact.php')
  // }
}
