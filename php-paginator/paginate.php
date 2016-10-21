<?php

namespace Paginator;

class Paginate
{
    private $items;
    private $perPage;
    private $currentPage;
    private $pages;

    public function __construct($items, $perPage, $currentPage = 0)
    {
        $this->items = (int)$items;
        $this->perPage = (int)$perPage;
        $this->currentPage = (int)$currentPage - 1;
        $this->pages = floor($this->items / $this->perPage);
    }

    private function buildList()
    {
        $list = [];

        // Loop through the pages surrounding the current page
        for($page = $this->currentPage - 4; $page <= $this->currentPage + 4; $page++)
        {
            $list[] = $page;
        }

        // Always include first two pages
        $list[] = 0;
        $list[] = 1;

        // Always include last two pages
        $list[] = $this->pages - 2;
        $list[] = $this->pages - 1;

        // Remove any pages less than zero or greater than the total number of pages
        $list = array_map(function($value)
        {
            if($value < 0)
            {
                return 0;
            }

            if($value >= $this->pages - 1)
            {
                return $this->pages - 1;
            }

            return $value;
        }, $list);

        // Filter out any duplicates
        $list = array_unique($list);
        sort($list);

        return $list;
    }

    public function renderText()
    {
        $list = $this->buildList();
        $previousPage = 0;
        $output = [];

        foreach($list as $page)
        {
            if($page - $previousPage > 1)
            {
                $output[] = "...";
            }

            $output[] =  "[" . ($page + 1) . "]";
            $previousPage = $page;
        }

        return implode(' ', $output);
    }

    public function renderHTML()
    {
        $list = $this->buildList();
        $previousPage = 0;
        $output = [];

        // Previous button
        if($this->currentPage > 0)
        {
            $output[] = "<li><a href='?page=" . $this->currentPage . "'>«</a></li>";
        }
        else
        {
                $output[] = "<li class='disabled'>«</li>";
        }

        foreach($list as $page)
        {
            if($page - $previousPage > 1)
            {
                $output[] = "<li class='disabled'>...</li>";
            }

            if($this->currentPage == $page)
            {
                $output[] =  "<li class='active'><a href='?page=" . ($page + 1) . "'>" . ($page + 1) . "</a></li>";

            }
            else
            {
                $output[] =  "<li><a href='?page=" . ($page + 1) . "'>" . ($page + 1) . "</a></li>";
            }
    
            $previousPage = $page;
        }

        // Next button
        if($this->currentPage + 2 <= $this->pages)
        {
            $output[] = "<li><a href='?page=" . ($this->currentPage + 2) . "'>»</a></li>";
        }
        else
        {
                $output[] = "<li class='disabled'>»</li>";
        }

        return "<ul class='pagination'>" . implode("\n", $output) . "</ul>";
    }
}

?>
