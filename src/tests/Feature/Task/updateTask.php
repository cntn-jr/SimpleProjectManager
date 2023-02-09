<?php

namespace Tests\Feature\Task;

use App\Models\Task;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class updateTask extends TestCase
{

    // テスト終了後にマイグレーションを実行する
    public function tearDown(): void
    {
        parent::setUp();
        $this->artisan('migrate:refresh --seed');
    }

    /**
     * @test
     */
    public function updateTask()
    {
        // ユーザの作成
        $user = User::factory()->create();
        $user = User::find($user->id);
        // タスクの作成
        $task = Task::factory()->create([
            'title' => "title1",
            'due' => "2022-12-11",
            'priority' => "high",
            'description' => "description1",
            'is_finished' => 0,
            'user_id' => $user->id,
        ]);
        $task = Task::find($task->id);
        // タスク更新APIの実行（１回目）
        $response = $this->actingAs($user)->json("PUT", "api/task/update", [
            'id' => $task->id,
            'title' => "title1",
            'due' => "2022-03-06",
            'priority' => "middle",
            'description' => "description1",
            'is_finished' => 0,
            'user_id' => $user->id,
        ]);
        $response->assertStatus(200);
        // 上記のAPIで作成使用したデータがデータベースに存在するかチェック（１回目）
        $this->assertDatabaseHas('task', [
            'id' => $task->id,
            'title' => "title1",
            'due' => "2022-03-06",
            'priority' => "middle",
            'description' => "description1",
            'is_finished' => 0,
            'user_id' => $user->id,
        ]);
        // タスク更新APIの実行（２回目）
        $response = $this->actingAs($user)->json("PUT", "api/task/update", [
            'id' => $task->id,
            'title' => "title2",
            'due' => "2022-02-14",
            'priority' => "low",
            'description' => "",
            'is_finished' => 1,
            'user_id' => $user->id,
        ]);
        $response->assertStatus(200);
        // 上記のAPIで作成使用したデータがデータベースに存在するかチェック（２回目）
        $this->assertDatabaseHas('task', [
            'id' => $task->id,
            'title' => "title2",
            'due' => "2022-02-14",
            'priority' => "low",
            'description' => null,
            'is_finished' => 1,
            'user_id' => $user->id,
        ]);
    }

    /**
     * @test
     */
    public function updateMaxCharacter()
    {
        // ユーザの作成
        $user = User::factory()->create();
        $user = User::find($user->id);
        // titleの作成
        $title_max = str_repeat("a", 63);
        // タスクの作成
        $task = Task::factory()->create([
            'title' => "title",
            'due' => "2022-12-11",
            'priority' => "high",
            'description' => "description",
            'is_finished' => 0,
            'user_id' => $user->id,
        ]);
        // タスク更新APIの実行（titleの文字列が最大数の場合）
        $response = $this->actingAs($user)->json("PUT", "api/task/update", [
            'id' => $task->id,
            'title' => $title_max,
            'due' => "2022-12-11",
            'priority' => "high",
            'description' => "description",
            'is_finished' => 1,
            'user_id' => $user->id,
        ]);
        $response->assertStatus(200);
        // titleの作成
        $title_max = str_repeat("a", 64);
        // タスク更新APIの実行（titleの文字列が最大数を超えている場合）
        $response = $this->actingAs($user)->json("PUT", "api/task/update", [
            'id' => $task->id,
            'title' => $title_max,
            'due' => "2022-12-11",
            'priority' => "high",
            'description' => "description",
            'is_finished' => 1,
            'user_id' => $user->id,
        ]);
        $response->assertStatus(401);
        // descriptionの作成
        $description = str_repeat("a", 519);
        // タスク更新APIの実行（descriptionの文字列が最大数の場合）
        $response = $this->actingAs($user)->json("PUT", "api/task/update", [
            'id' => $task->id,
            'title' => "title",
            'due' => "2022-12-11",
            'priority' => "high",
            'description' => $description,
            'is_finished' => 1,
            'user_id' => $user->id,
        ]);
        $response->assertStatus(200);
        // descriptionの作成
        $description = str_repeat("a", 520);
        // タスク更新APIの実行（descriptionの文字列が最大数を超えている場合）
        $response = $this->actingAs($user)->json("PUT", "api/task/update", [
            'id' => $task->id,
            'title' => "title",
            'due' => "2022-12-11",
            'priority' => "high",
            'description' => $description,
            'is_finished' => 1,
            'user_id' => $user->id,
        ]);
        $response->assertStatus(401);
    }

    /**
     * @test
     */
    public function updateValidationFailed()
    {
        // ユーザの作成
        $user = User::factory()->create();
        $user = User::find($user->id);
        // タスクの作成
        $task = Task::factory()->create([
            'title' => "title",
            'due' => "2022-12-11",
            'priority' => "high",
            'description' => "description",
            'is_finished' => 0,
            'user_id' => $user->id,
        ]);
        // タスク更新APIの実行（titleがnullの場合）
        $response = $this->actingAs($user)->json("PUT", "api/task/update", [
            'id' => $task->id,
            'title' => "",
            'due' => "2022-12-11",
            'priority' => "high",
            'description' => "description",
            'is_finished' => 1,
            'user_id' => $user->id,
        ]);
        $response->assertStatus(401);
        // タスク更新APIの実行（dueがnullの場合）
        $response = $this->actingAs($user)->json("PUT", "api/task/update", [
            'id' => $task->id,
            'title' => "title",
            'due' => "",
            'priority' => "high",
            'description' => "description",
            'is_finished' => 1,
            'user_id' => $user->id,
        ]);
        $response->assertStatus(401);
        // タスク更新APIの実行（dueが正確な値ではない場合）
        $response = $this->actingAs($user)->json("PUT", "api/task/update", [
            'id' => $task->id,
            'title' => "title",
            'due' => "2022-02-31",
            'priority' => "high",
            'description' => "description",
            'is_finished' => 1,
            'user_id' => $user->id,
        ]);
        $response->assertStatus(401);
        // タスク更新APIの実行（priorityがnullの場合）
        $response = $this->actingAs($user)->json("PUT", "api/task/update", [
            'id' => $task->id,
            'title' => "title",
            'due' => "2022-02-14",
            'priority' => "",
            'description' => "description",
            'is_finished' => 1,
            'user_id' => $user->id,
        ]);
        $response->assertStatus(401);
        // タスク更新APIの実行（priorityがhigh middle middle以外の場合）
        $response = $this->actingAs($user)->json("PUT", "api/task/update", [
            'id' => $task->id,
            'title' => "title",
            'due' => "2022-02-14",
            'priority' => "zero",
            'description' => "description",
            'is_finished' => 1,
            'user_id' => $user->id,
        ]);
        $response->assertStatus(401);
        // タスク更新APIの実行（is_finishedがnullの場合）
        $response = $this->actingAs($user)->json("PUT", "api/task/update", [
            'id' => $task->id,
            'title' => "title",
            'due' => "2022-02-14",
            'priority' => "high",
            'description' => "description",
            'is_finished' => "",
            'user_id' => $user->id,
        ]);
        $response->assertStatus(401);
        // タスク更新APIの実行（is_finishedがtrue false以外の場合）
        $response = $this->actingAs($user)->json("PUT", "api/task/update", [
            'id' => $task->id,
            'title' => "title",
            'due' => "2022-02-14",
            'priority' => "high",
            'description' => "description",
            'is_finished' => 2,
            'user_id' => $user->id,
        ]);
        $response->assertStatus(401);
        // 他ユーザの取得
        $other_user = User::where("id", "<>", $user->id)->first();
        // タスク更新APIの実行（user_idがAPIの実行ユーザ以外の場合）
        $response = $this->actingAs($user)->json("PUT", "api/task/update", [
            'id' => $task->id,
            'title' => "title",
            'due' => "2022-02-14",
            'priority' => "high",
            'description' => "description",
            'is_finished' => 2,
            'user_id' => $other_user->id,
        ]);
        $response->assertStatus(401);
    }

    /**
     * @test
     */
    public function updateTaskNotLogin()
    {
        // ユーザの作成
        $user = User::factory()->create();
        $user = User::find($user->id);
        // タスクの作成
        $task = Task::factory()->create([
            'title' => "title",
            'due' => "2022-12-11",
            'priority' => "high",
            'description' => "description",
            'is_finished' => 0,
            'user_id' => $user->id,
        ]);
        // タスク更新APIの実行（ユーザログインしていない場合）
        $response = $this->json("PUT", "api/task/update", [
            'id' => $task->id,
            'title' => "",
            'due' => "2022-12-11",
            'priority' => "high",
            'description' => "description",
            'is_finished' => 1,
            'user_id' => $user->id,
        ]);
        $response->assertStatus(401);
    }
}
