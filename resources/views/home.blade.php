<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>File Tracker</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <!-- Fonts -->
    <link rel="dns-prefetch" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}"></script>
    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link rel="stylesheet" href="{{ mix('/css/app.css') }}">
    <!-- font awesome -->
    <link href="{{ asset('css/fontawesome.css') }}" rel="stylesheet">
    <!-- Styles -->
    <link rel="icon" href="{{URL::asset('/storage/image/gsu-logo.png')}}">

    <style>
        body {
            font-family: 'Open Sans', sans-serif;
            font-size: 16px;
            font-weight: 300;
            background: white;
        }
    </style>
</head>

<body>
    <div id="app">
        <div id="home" class="mainContainer">

        </div>

    </div>

</body>

</html>