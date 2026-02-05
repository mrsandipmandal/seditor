<?php

namespace OpenPHP\SEditor;

class Installer
{
    public static function copyAssets($event = null)
    {
        $source = __DIR__ . '/../assets';
        $dest = getcwd() . '/assets'; // Copy to 'assets' folder in project root

        if (!file_exists($dest)) {
            mkdir($dest, 0755, true);
        }

        $files = scandir($source);
        foreach ($files as $file) {
            if ($file !== '.' && $file !== '..') {
                copy("$source/$file", "$dest/$file");
            }
        }

        echo "SEditor Assets published to: $dest\n";
    }
}
