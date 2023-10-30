<?php

namespace App\Traits;

use App\Models\Appointment;
use DOMDocument;
use Illuminate\Support\Facades\Auth;

trait Query
{

    public static function generateRandChars($string, $length = 8)
    {
        $chars = md5($string);
        $charLength = strlen($chars);
        $randStr = '';

        for ($i = 0; $i < $length; $i++) {
            $randStr .= $chars[rand(0, $charLength - 1)];
        }

        return $randStr;
    }

    public static function replace_img_src($htm)
    {
        $doc = new DOMDocument();
        $doc->loadHTML($htm);
        $tags = $doc->getElementsByTagName('img');
        foreach ($tags as $tag) {
            $old_src = $tag->getAttribute('src');
            $new_src_url = public_path($old_src);
            $tag->setAttribute('src', $new_src_url);
        }
        return $doc->saveHTML();
    }

    public static function get_guard()
    {
        if (Auth::guard('admin')->check()) {
            return "admin";
        } else {
            return "staff";
        }
    }

    /**
     * Replaces spaces with full text search wildcards
     *
     * @param string $term
     * @return string
     */
    static function h_wildcards($term)
    {
        // removing symbols used by MySQL
        $reservedSymbols = ['-', '+', '<', '>', '(', ')', '~'];
        $term = str_replace($reservedSymbols, '', $term);
        $words = explode(' ', $term);

        foreach ($words as $key => $word) {
            /*
             * applying + operator (required word) only big words
             * because smaller ones are not indexed by mysql
             */
            if (strlen($word) > 0) {
                $words[$key] = $word . '*';
            }
        }
        $searchTerm = implode(' ', $words);
        return $searchTerm;
    }
}
