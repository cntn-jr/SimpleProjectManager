<?php

namespace App\Http\Controllers;

use App\Models\Schedule;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ScheduleController extends Controller
{
    public function index()
    {
        $schedule_model = new Schedule();
        $schedules = $schedule_model->getSchedules();
        return response()->json($schedules);
    }

    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:63'],
            'start' => ['required', 'date',],
            'end' => ['required', 'date',]
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors()->toArray();
            $response['errors'] = ['name' => [], 'start_date' => [], 'end_date' => [],];
            foreach ($errors as $error_key => $error) {
                $response['errors'][$error_key] = $error;
            };
            return response()->json($request, 401);
        }
        try {
            $schedule = Schedule::find($request->id);
            $schedule->title = $request->name;
            $schedule->start_date = $request->start;
            $schedule->end_date = $request->end;
            $schedule->save();
        } catch (Exception $err) {
            return response()->json([], 401);
        };
    }
}
