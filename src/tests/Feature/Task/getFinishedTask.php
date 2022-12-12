<?php

namespace Tests\Feature\Task;

use App\Models\Task;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class getFinishedTask extends TestCase
{
    /**
     * @test
     */
    public function access_200_api()
    {
        // ログイン済み
        $user = User::find(1);
        $this->actingAs($user)->json("GET", "api/task/finished")->assertStatus(200);
    }

    /**
     * @test
     */
    public function access_401_api()
    {
        // ログインしていないユーザは、APIを使用できない
        $this->json("GET", "api/task/finished")->assertStatus(401);
    }

    /**
     * @test
     */
    public function getTaskByCorrectUser()
    {
        // ユーザの作成
        $user = User::factory()->create();
        $user = User::Find($user->id);
        // タスクの作成
        $task_id = DB::table('task')->orderBy("id", "desc")->first()->id;
        Task::factory()->create([
            'id' => $task_id + 1,
            'user_id' => $user->id,
            'title' => 'title1',
            'description' => 'description1',
            'priority' => 'high',
            'due' => '2022-12-05',
            'is_finished' => 1,
            'created_at' => "2022-01-10 00:00:00",
            'updated_at' => "2022-01-10 00:00:00",
        ]);
        Task::factory()->create([
            'id' => $task_id + 2,
            'user_id' => $user->id,
            'title' => 'title2',
            'description' => 'description2',
            'priority' => 'middle',
            'due' => '2022-11-20',
            'is_finished' => 1,
            'created_at' => "2022-01-10 00:00:00",
            'updated_at' => "2022-01-10 00:00:00",
        ]);
        Task::factory()->create([
            'id' => $task_id + 3,
            'user_id' => $user->id,
            'title' => 'title3',
            'description' => 'description3',
            'priority' => 'low',
            'due' => '2022-05-30',
            'is_finished' => 1,
            'created_at' => "2022-01-10 00:00:00",
            'updated_at' => "2022-01-10 00:00:00",
        ]);
        // is_finished属性が1（true）なので、下記のタスクは当APIでは取得されない
        Task::factory()->create([
            'id' => $task_id + 4,
            'user_id' => $user->id,
            'title' => 'title3',
            'description' => 'description3',
            'priority' => 'low',
            'due' => '2022-05-30',
            'is_finished' => 0,
            'created_at' => "2022-01-10 00:00:00",
            'updated_at' => "2022-01-10 00:00:00",
        ]);
        $response = $this->actingAs($user)->json('GET', 'api/task/finished');
        $response->assertStatus(200);
        $response->assertJsonCount(3);
        $response->assertJson([
            [
                'id' => $task_id + 1,
                'user_id' => $user->id,
                'title' => 'title1',
                'description' => 'description1',
                'priority' => 'high',
                'due' => '2022-12-05',
                'is_finished' => 1,
                'created_at' => "2022-01-10 00:00:00",
                'updated_at' => "2022-01-10 00:00:00",
                'deleted_at' => null,
            ],
            [
                'id' => $task_id + 2,
                'user_id' => $user->id,
                'title' => 'title2',
                'description' => 'description2',
                'priority' => 'middle',
                'due' => '2022-11-20',
                'is_finished' => 1,
                'created_at' => "2022-01-10 00:00:00",
                'updated_at' => "2022-01-10 00:00:00",
                'deleted_at' => null,
            ],
            [
                'id' => $task_id + 3,
                'user_id' => $user->id,
                'title' => 'title3',
                'description' => 'description3',
                'priority' => 'low',
                'due' => '2022-05-30',
                'is_finished' => 1,
                'created_at' => "2022-01-10 00:00:00",
                'updated_at' => "2022-01-10 00:00:00",
                'deleted_at' => null,
            ],
        ]);
    }

    /**
     * @test
     */
    public function getTaskByIncorrectUser()
    {
        // ユーザの作成
        $correct_user = User::factory()->create();
        $correct_user = User::Find($correct_user->id);
        $inconrrect_user = User::factory()->create();
        $inconrrect_user = User::Find($inconrrect_user->id);
        // タスクの作成
        $task_id = DB::table('task')->orderBy("id", "desc")->first()->id;
        Task::factory()->create([
            'id' => $task_id + 1,
            'user_id' => $correct_user->id,
            'title' => 'title1',
            'description' => 'description1',
            'priority' => 'high',
            'due' => '2022-12-05',
            'is_finished' => 1,
            'created_at' => "2022-01-10 00:00:00",
            'updated_at' => "2022-01-10 00:00:00",
        ]);
        Task::factory()->create([
            'id' => $task_id + 2,
            'user_id' => $correct_user->id,
            'title' => 'title2',
            'description' => 'description2',
            'priority' => 'middle',
            'due' => '2022-11-20',
            'is_finished' => 1,
            'created_at' => "2022-01-10 00:00:00",
            'updated_at' => "2022-01-10 00:00:00",
        ]);
        // タスクを作成したユーザとは別のユーザがそのデータを取得することができないことをチェックする
        $response = $this->actingAs($inconrrect_user)->json('GET', 'api/task/finished');
        $response->assertStatus(200);
        $response->assertJsonMissing([
            [
                'id' => $task_id + 1,
                'user_id' => $correct_user->id,
                'title' => 'title1',
                'description' => 'description1',
                'priority' => 'high',
                'due' => '2022-12-05',
                'is_finished' => 1,
                'created_at' => "2022-01-10 00:00:00",
                'updated_at' => "2022-01-10 00:00:00",
                'deleted_at' => null,
            ],
            [
                'id' => $task_id + 2,
                'user_id' => $correct_user->id,
                'title' => 'title2',
                'description' => 'description2',
                'priority' => 'middle',
                'due' => '2022-11-20',
                'is_finished' => 1,
                'created_at' => "2022-01-10 00:00:00",
                'updated_at' => "2022-01-10 00:00:00",
                'deleted_at' => null,
            ],
        ]);
    }
}
