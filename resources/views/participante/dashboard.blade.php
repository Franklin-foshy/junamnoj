<!-------------------------DASHBOARD PARTICIPANTE------------------------->
<!-------------------------DASHBOARD PARTICIPANTE------------------------->
<!-------------------------DASHBOARD PARTICIPANTE------------------------->
<!-------------------------DASHBOARD PARTICIPANTE------------------------->
<!-------------------------DASHBOARD PARTICIPANTE------------------------->
<!-------------------------DASHBOARD PARTICIPANTE------------------------->
<!-------------------------DASHBOARD PARTICIPANTE------------------------->
<!-------------------------DASHBOARD PARTICIPANTE------------------------->
<!-------------------------DASHBOARD PARTICIPANTE------------------------->
<!-------------------------DASHBOARD PARTICIPANTE------------------------->
<!-------------------------DASHBOARD PARTICIPANTE------------------------->
<!-------------------------DASHBOARD PARTICIPANTE------------------------->
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <link rel="apple-touch-icon" sizes="76x76" href="{{ asset('assets/img/apple-icon.png') }}">
  <link rel="icon" type="image/png" href="{{ asset('css/img/favicon.png') }}">
  <title>
    Material Dashboard 2 by Creative Tim
  </title>
  <!--     Fonts and icons     -->
  <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900|Roboto+Slab:400,700" />
  <!-- Nucleo Icons -->
  <link href="{{ asset('css/nucleo-icons.css') }}" rel="stylesheet" />
  <link href="{{ asset('css/nucleo-svg.css') }}" rel="stylesheet" />
  <!-- Font Awesome Icons -->
  <script src="https://kit.fontawesome.com/42d5adcbca.js" crossorigin="anonymous"></script>
  <!-- Material Icons -->
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" rel="stylesheet">
  <!-- CSS Files -->
  <link id="pagestyle" href="{{ asset('css/material-dashboard.css?v=3.1.0') }}" rel="stylesheet" />
  <!-- Nepcha Analytics (nepcha.com) -->
  <!-- Nepcha is a easy-to-use web analytics. No cookies and fully compliant with GDPR, CCPA and PECR. -->
  <script defer data-site="YOUR_DOMAIN_HERE" src="https://api.nepcha.com/js/nepcha-analytics.js"></script>
</head>

<body class="g-sidenav-show bg-gray-200">

  <!-- Menu -->
  @include('participante.dashboard_componentes.menu')
  
  <!-- Cerrar Menu -->
  
  <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
  
  <!-- Header -->
  @include('participante.dashboard_componentes.header')
  
  <!-- Cerrar Header -->
  
  <!-- Titulo Corresponsabilidad -->
  @include('participante.dashboard_componentes.titulo')
  
  <!-- Cerrar Titulo Corresponsabilidad -->
  
  <!-- Imagenes Niveles -->
  @include('participante.dashboard_componentes.niveles')
  
  <!-- Cerrar Imagenes Niveles -->
  
  <!-- Gif Comentario -->
  @include('participante.dashboard_componentes.gif_comentario')
  
  <!-- Cerrar Gif Comentario -->
  
  <footer class="footer py-4">
  
  </main>
  
  <!-- Configuración colores -->
  @include('participante.dashboard_componentes.configuracion_colores')
  
  <!-- Cerrar Configuración colores -->
  
    <!-- Github buttons -->
    <script async defer src="https://buttons.github.io/buttons.js"></script>
  
    <!-- Control Center for Material Dashboard: parallax effects, scripts for the example pages etc -->
    <script src="{{ asset('js/material-dashboard.min.js?v=3.1.0')}}"></script>
    <script src="{{ asset('js/script_index.js') }}"></script>
  </body>

</html>

<!-------------------------DASHBOARD PARTICIPANTE------------------------->
<!-------------------------DASHBOARD PARTICIPANTE------------------------->
<!-------------------------DASHBOARD PARTICIPANTE------------------------->
<!-------------------------DASHBOARD PARTICIPANTE------------------------->
<!-------------------------DASHBOARD PARTICIPANTE------------------------->
<!-------------------------DASHBOARD PARTICIPANTE------------------------->
<!-------------------------DASHBOARD PARTICIPANTE------------------------->
<!-------------------------DASHBOARD PARTICIPANTE------------------------->
<!-------------------------DASHBOARD PARTICIPANTE------------------------->
<!-------------------------DASHBOARD PARTICIPANTE------------------------->
<!-------------------------DASHBOARD PARTICIPANTE------------------------->
<!-------------------------DASHBOARD PARTICIPANTE------------------------->