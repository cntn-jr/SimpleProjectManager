<?php

namespace App\Http\Controllers;

use App\Models\Schedule;
use Illuminate\Http\Request;

class ScheduleController extends Controller
{
    public function index(){
        $schedule_model = new Schedule();
        $schedules = $schedule_model->getSchedules();
        return response()->json($schedules);
    }
}
