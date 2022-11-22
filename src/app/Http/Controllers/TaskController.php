<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class TaskController extends Controller
{

    public function index()
    {
        $login_user = Auth::user();
        $user_id = $login_user->id;
        $task_model = new Task();
        $tasks = $task_model->getTask($user_id);
        return response()->json($tasks);
    }

    public function getFinishedTask()
    {
        $login_user = Auth::user();
        $user_id = $login_user->id;
        $task_model = new Task();
        $tasks = $task_model->getFinishedTask($user_id);
        return response()->json($tasks);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => ['required', 'string', 'max:63'],
            'due' => ['required', 'date',],
            'priority' => ['required', Rule::in(['high', 'middle', 'low']),],
            'description' => ['string', 'nullable', 'max:519',],
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors()->toArray();
            $response['errors'] = ['title' => [], 'due' => [], 'priority' => [], 'descriptione' => []];
            foreach ($errors as $error_key => $error) {
                $response['errors'][$error_key] = $error;
            };
            return response()->json($response, 401);
        }
        $login_user = Auth::user();
        $user_id = $login_user->id;
        $new_task = new Task();
        $new_task->title = $request->title;
        $new_task->due = $request->due;
        $new_task->priority = $request->priority;
        $new_task->description = $request->description;
        $new_task->is_finished = false;
        $new_task->user_id = $user_id;
        $new_task->save();
    }

    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => ['required', 'string', 'max:63'],
            'due' => ['required', 'date',],
            'priority' => ['required', Rule::in(['high', 'middle', 'low']),],
            'description' => ['string', 'nullable', 'max:519',],
            'is_finished' => [Rule::in([0, 1])],
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors()->toArray();
            $response['errors'] = ['title' => [], 'due' => [], 'priority' => [], 'descriptione' => []];
            foreach ($errors as $error_key => $error) {
                $response['errors'][$error_key] = $error;
            };
            return response()->json($response, 401);
        }
        $login_user = Auth::user();
        $user_id = $login_user->id;
        $task = Task::find($request->id);
        if ($user_id != $task->user_id)
            return response()->json([], 401);
        $task->title = $request->title;
        $task->due = $request->due;
        $task->priority = $request->priority;
        $task->description = $request->description;
        $task->is_finished = $request->is_finished;
        $task->save();
        return response()->json($request);
    }

    public function finish(Request $request)
    {
        $login_user = Auth::user();
        $user_id = $login_user->id;
        $task_id_ary = $request->task_id_ary;
        foreach ($task_id_ary as $task_id) {
            try {
                $task = Task::find($task_id);
                if ($user_id != $task->user_id)
                    throw new Exception();
                $task->is_finished = !$task->is_finished;
                $task->save();
            } catch (Exception $err) {
                return response()->json($err, 401);
            }
        }
    }

    public function delete(Request $request)
    {
        $login_user = Auth::user();
        $user_id = $login_user->id;
        $task_id_ary = $request->task_id_ary;
        foreach ($task_id_ary as $task_id) {
            try {
                $task = Task::find($task_id);
                if ($user_id != $task->user_id)
                    throw new Exception();
                $task->delete();
            } catch (Exception $err) {
                return response()->json($err, 401);
            }
        }
    }
}
