<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    @viteReactRefresh
    @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
    @inertiaHead
    <!-- <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous')}}">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script> -->
  
  
    <link rel="shortcut icon" href="{{ asset('assets/images/favicon.ico') }}" />
          <!-- Bootstrap CSS -->
      <link rel="stylesheet"  href="{{ asset('assets/css/bootstrap.min.css')}}">
      <!-- Typography CSS -->
      <link rel="stylesheet"  href="{{ asset('assets/css/typography.css')}}">
      <!-- Style CSS -->
      <link rel="stylesheet"  href="{{ asset('assets/css/style.css')}}">
      <!-- Responsive CSS -->
      <link rel="stylesheet"  href="{{ asset('assets/css/responsive.css')}}">

    </head>
  <body class=" ">
     <!-- loader Start -->
     <div id="loading">
         <div id="loading-center">
         </div>
      </div>
      <!-- loader END -->
    @inertia
  </body>
  <script src="{{ asset('assets/js/jquery.min.js') }}"></script>
      <!-- Rtl and Darkmode -->
      <script src="{{ asset('assets/js/rtl.js')}}"></script>
      <script src="{{ asset('assets/js/customizer.js')}}"></script>
      <script src="{{ asset('assets/js/popper.min.js')}}"></script>
      <script src="{{ asset('assets/js/bootstrap.min.js')}}"></script>
      <!-- Appear JavaScript -->
      <script src="{{ asset('assets/js/jquery.appear.js')}}"></script>
      <!-- Countdown JavaScript -->
      <script src="{{ asset('assets/js/countdown.min.js')}}"></script>
      <!-- Counterup JavaScript -->
      <script src="{{ asset('assets/js/waypoints.min.js')}}"></script>
      <script src="{{ asset('assets/js/jquery.counterup.min.js')}}"></script>
      <!-- Wow JavaScript -->
      <script src="{{ asset('assets/js/wow.min.js')}}"></script>
      <!-- Apexcharts JavaScript -->
      <script src="{{ asset('assets/js/apexcharts.js')}}"></script>
      <!-- Slick JavaScript -->
      <script src="{{ asset('assets/js/slick.min.js')}}"></script>
      <!-- Select2 JavaScript -->
      <script src="{{ asset('assets/js/select2.min.js')}}"></script>
      <!-- Owl Carousel JavaScript -->
      <script src="{{ asset('assets/js/owl.carousel.min.js')}}"></script>
      <!-- Magnific Popup JavaScript -->
      <script src="{{ asset('assets/js/jquery.magnific-popup.min.js')}}"></script>
       <script src="{{ asset('assets/js/smooth-scrollbar.js')}}"></script>
      <!-- lottie JavaScript -->
      <script src="{{ asset('assets/js/lottie.js')}}"></script>
      <!-- Chart Custom JavaScript -->
      <script src="{{ asset('assets/js/chart-custom.js')}}"></script>
      <!-- Custom JavaScript -->
      <script src="{{ asset('assets/js/custom.js')}}"></script> 
      </html>
