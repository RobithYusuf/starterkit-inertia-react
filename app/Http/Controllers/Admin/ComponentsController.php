<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class ComponentsController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard/Admin/Components/Index');
    }
}
