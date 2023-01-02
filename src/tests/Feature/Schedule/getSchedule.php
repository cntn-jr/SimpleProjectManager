<?php

namespace Tests\Feature\Schedule;

use App\Models\Schedule;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class getSchedule extends TestCase
{
    // テスト開始前にマイグレーションを実行する
    public function setUp(): void
    {
        parent::setUp();
        $this->artisan('migrate:refresh');
    }

    // テスト終了後にマイグレーションを実行する
    public function tearDown(): void
    {
        parent::setUp();
        $this->artisan('migrate:refresh --seed');
    }

    /**
     * @test
     */
    public function getSchedule()
    {
        // ユーザの作成
        $user = User::factory()->create();
        $user = User::Find($user->id);
        // スケジュールの作成
        // $schedule_id = DB::table('schedules')->orderBy("id", "desc")->first()->id;
        $schedule_id = 0;
        Schedule::factory()->create([
            'id' => $schedule_id + 1,
            'title' => 'title1',
            'description' => 'description1',
            'start_date' => '2022-12-05',
            'end_date' => '2022-12-12',
            'type' => 'task',
            'progress' => 100,
            'created_at' => "2022-01-10 00:00:00",
            'updated_at' => "2022-01-10 00:00:00",
        ]);
        Schedule::factory()->create([
            'id' => $schedule_id + 2,
            'title' => 'title2',
            'description' => 'description2',
            'start_date' => '2022-12-06',
            'end_date' => '2022-12-13',
            'type' => 'task',
            'progress' => 100,
            'created_at' => "2022-01-10 00:00:00",
            'updated_at' => "2022-01-10 00:00:00",
        ]);
        Schedule::factory()->create([
            'id' => $schedule_id + 3,
            'title' => 'title3',
            'description' => 'description3',
            'start_date' => '2022-01-05',
            'end_date' => '2022-01-12',
            'type' => 'task',
            'progress' => 100,
            'created_at' => "2022-01-10 00:00:00",
            'updated_at' => "2022-01-10 00:00:00",
        ]);
        $response = $this->actingAs($user)->json('GET', 'api/schedules');
        $response->assertStatus(200);
        $response->assertJson([
            [
                'id' => $schedule_id + 1,
                'name' => 'title1',
                // 'description' => 'description1',
                'start' => '2022-12-05',
                'end' => '2022-12-12',
                'type' => 'task',
                'progress' => 100,
            ],
            [
                'id' => $schedule_id + 2,
                'name' => 'title2',
                // 'description' => 'description2',
                'start' => '2022-12-06',
                'end' => '2022-12-13',
                'type' => 'task',
                'progress' => 100,
            ],
            [
                'id' => $schedule_id + 3,
                'name' => 'title3',
                // 'description' => 'description3',
                'start' => '2022-01-05',
                'end' => '2022-01-12',
                'type' => 'task',
                'progress' => 100,
            ],
        ]);
    }

    /**
     * @test
     */
    public function getScheduleByNotLoginUser()
    {
        // スケジュールの作成
        // $schedule_id = DB::table('schedules')->orderBy("id", "desc")->first()->id;
        $schedule_id = 0;
        Schedule::factory()->create([
            'id' => $schedule_id + 1,
            'title' => 'title1',
            'description' => 'description1',
            'start_date' => '2022-12-05',
            'end_date' => '2022-12-12',
            'type' => 'task',
            'progress' => 100,
            'created_at' => "2022-01-10 00:00:00",
            'updated_at' => "2022-01-10 00:00:00",
        ]);
        $response = $this->json('GET', 'api/schedules');
        $response->assertStatus(401);
    }
}
