@extends('layouts.app')

@section('content')
<div class="pdf-container">
    <h1>{{ $file->title }}</h1>
    {!! $file->content !!}

    <img src="{{base_path('storage/app/public/gsu-logo.png')}}" alt="" style="width: 150px; height: 150px;">

    <img src="{{URL::asset('/storage/image/gsu-logo.png')}}">
</div>
@endsection