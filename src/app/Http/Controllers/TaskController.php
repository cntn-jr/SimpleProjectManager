<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Exception;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index()
    {
        $task_model = new Task();
        $tasks = $task_model->getTask(1);
        return response()->json($tasks);
    }

    public function store(Request $request)
    {
        $new_task = new Task();
        $new_task->title = $request->title;
        $new_task->due = $request->due;
        $new_task->priority = $request->priority;
        $new_task->description = $request->description;
        $new_task->is_finished = false;
        $new_task->user_id = 1;
        $new_task->save();
    }

    public function finish(Request $request)
    {
        $task_id_ary = $request->task_id_ary;
        foreach ($task_id_ary as $task_id) {
            try {
                $task = Task::find($task_id);
                $task->is_finished = 1;
                $task->save();
            } catch (Exception $err) {
                return response()->json($err);
            }
        }
    }

    public function delete(Request $request)
    {
        $task_id_ary = $request->task_id_ary;
        foreach ($task_id_ary as $task_id) {
            try {
                $task = Task::find($task_id);
                $task->delete();
            } catch (Exception $err) {
                return response()->json($err);
            }
        }
    }
}
