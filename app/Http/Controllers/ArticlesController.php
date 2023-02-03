<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ArticlesController extends Controller
{
    public function index() 
    {
        return Inertia::render('ArticleTest', [
            "data" => []
        ]);
    }


    public function show(Request $request, $stub)
    {

        $data = [
            "title" => "My Test Article",
            "subtitle" => "a test to see how we'd enable block based content",
            "hero" => "https://picsum.photos/1024/480",

            "content" => [
                [
                    "id" => "e6f7e7",
                    "type" => "Header",
                    "props" => [
                        "content" => "Introduction"
                    ]
                ],
                [
                    "id" => "5e6613",
                    "type" => "Wysiwyg",
                    "props" => [
                        "content" => "<p>lorem ipsum <a href=\"https://www.google.com\">link here</a> and then some additional content.</p>"
                    ]
                ],
                [
                    "id" => "djj37s",
                    "type" => "Image",
                    "props" => [
                        "alt" => "My rad image",
                        "uri" => "https://picsum.photos/640/480?random=1"
                    ]
                ],
                [
                    "id" => "dhsy46",
                    "type" => "Accordion",
                    "props" => [
                        "title" => "My Sweet accordion",
                        "items" => [
                            [
                                "title" => "One",
                                "body" => "dsjkdsajsad adksad adsa"
                            ],
                            [
                                "title" => "Two",
                                "body" => "Jai"
                            ],
                        ]
                    ]
                ]
            ]
        ];

        return Inertia::render('Article', [
            "data" => $data
        ]);
    }
}
