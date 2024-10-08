<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="{{ asset('css/styles3.css')}}">
    <title>{{_('hirtoria_nivel_2')}}</title>
</head>
<body>

<!-------------------------------------- modal --------------------------------------------->

@include('participante.Nivel-2.componenetes_nivel2.modal')

<!-------------------------------------- modal --------------------------------------------->

<!---------------------- header ------------------------>

@include('participante.Nivel-2.componenetes_nivel2.header')

<!---------------------- header ------------------------>

<!---------------------- barra preogreso ------------------------>

@include('participante.Nivel-2.componenetes_nivel2.barra_progreso')

<!---------------------- barra preogreso ------------------------>


<!---------------------- vidas ------------------------>

<div id="vidas">
    <span class="vida"></span>
</div>

<!---------------------- vidas ------------------------>

<!------------------------------ marco historia ------------------------------------>

@include('participante.Nivel-2.componenetes_nivel2.marco_historia')

<!------------------------------ marco historia ------------------------------------>


<!-------------------------------------- Boton siguiente --------------------------------------------->

@include('participante.Nivel-2.componenetes_nivel2.boton_historia')

<!-------------------------------------- Boton siguiente --------------------------------------------->

<!-------------------------------------- Boton salir --------------------------------------------->

<button class = "continuar" id="regresar"  href="{{ route('dashboard')}}" style="display:none;" onclick="goHome()">{{_('Regresar')}}</button>
<button class = "continuar" id="siguiente_escena" style="display:none;">{{_('Siguiente')}}</button>
<!-------------------------------------- Boton salir --------------------------------------------->




<script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.4.0/dist/confetti.browser.min.js"></script>

    <script src="{{ asset('js/historia_nivel2.js')}}"></script>
</body>

</html>


