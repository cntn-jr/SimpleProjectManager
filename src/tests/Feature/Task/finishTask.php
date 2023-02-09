<?php

namespace Tests\Feature\Task;

use App\Models\Task;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class finishTask extends TestCase
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
    public function finishTask()
    {
        // ユーザの作成
        $user = User::factory()->create();
        $user = User::find($user->id);
        // タスクの作成
        $tasks = Task::factory()->count(3)->create([
            'is_finished' => 0,
            'user_id' => $user->id,
        ]);
        // タスク完了APIの実行（完了にする）
        $response = $this->actingAs($user)->json("PUT", "api/task/finish", [
            'task_id_ary' => [$tasks[0]->id, $tasks[1]->id, $tasks[2]->id,],
        ]);
        $response->assertStatus(200);
        $this->assertDatabaseHas('task', [
            'id' => $tasks[0]->id,
            'is_finished' => 1,
        ]);
        $this->assertDatabaseHas('task', [
            'id' => $tasks[1]->id,
            'is_finished' => 1,
        ]);
        $this->assertDatabaseHas('task', [
            'id' => $tasks[2]->id,
            'is_finished' => 1,
        ]);
        // タスク完了APIの実行（未完了にする）
        $response = $this->actingAs($user)->json("PUT", "api/task/finish", [
            'task_id_ary' => [$tasks[0]->id, $tasks[1]->id, $tasks[2]->id,],
        ]);
        $response->assertStatus(200);
        $this->assertDatabaseHas('task', [
            'id' => $tasks[0]->id,
            'is_finished' => 0,
        ]);
        $this->assertDatabaseHas('task', [
            'id' => $tasks[1]->id,
            'is_finished' => 0,
        ]);
        $this->assertDatabaseHas('task', [
            'id' => $tasks[2]->id,
            'is_finished' => 0,
        ]);
    }

    /**
     * @test
     */
    public function finishTaskByOtherUser()
    {
        // ユーザの作成
        $user = User::factory()->create();
        $user = User::find($user->id);
        $other_user = User::factory()->create();
        $other_user = User::find($other_user->id);
        // タスクの作成
        $tasks = Task::factory()->count(3)->create([
            'is_finished' => 0,
            'user_id' => $user->id,
        ]);
        // タスク完了APIの実行（他のユーザで実行）
        $response = $this->actingAs($other_user)->json("PUT", "api/task/finish", [
            'task_id_ary' => [$tasks[0]->id, $tasks[1]->id, $tasks[2]->id,],
        ]);
        $response->assertStatus(401);
    }

    /**
     * @test
     */
    public function finishTaskByNotLoginUser()
    {
        // ユーザの作成
        $user = User::factory()->create();
        $user = User::find($user->id);
        // タスクの作成
        $tasks = Task::factory()->count(3)->create([
            'is_finished' => 0,
            'user_id' => $user->id,
        ]);
        // タスク完了APIの実行（ログインしていない）
        $response = $this->json("PUT", "api/task/finish", [
            'task_id_ary' => [$tasks[0]->id, $tasks[1]->id, $tasks[2]->id,],
        ]);
        $response->assertStatus(401);
    }
}
