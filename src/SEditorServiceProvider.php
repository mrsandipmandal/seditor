<?php

namespace OpenPHP\SEditor;

use Illuminate\Support\ServiceProvider;

class SEditorServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        // Publish Assets
        $this->publishes([
            __DIR__ . '/../assets' => public_path('vendor/seditor'),
        ], 'seditor-assets');
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
