<?php

namespace Tests\Feature\PrivateChat;

use App\Models\PrivateChatRoom;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class getRoom extends TestCase
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
    public function getRoom()
    {
        // ユーザの作成
        $user1 = User::factory()->create([
            "last_name" => "last1",
            "first_name" => "first1",
        ]);
        $user1 = User::find($user1->id);
        $user2 = User::factory()->create([
            "last_name" => "last2",
            "first_name" => "first2",
        ]);
        $user2 = User::find($user2->id);
        $user3 = User::factory()->create([
            "last_name" => "last3",
            "first_name" => "first3",
        ]);
        $user3 = User::find($user3->id);
        // チャットルームの作成
        $room_id = 1;
        $room1 = PrivateChatRoom::factory()->create([
            "id" => $room_id++,
            "user1_id" => $user1->id,
            "user2_id" => $user2->id,
            'created_at' => "2022-01-10 00:00:00",
            'updated_at' => "2022-01-10 00:00:00",
        ]);
        $room2 = PrivateChatRoom::factory()->create([
            "id" => $room_id++,
            "user1_id" => $user1->id,
            "user2_id" => $user3->id,
            'created_at' => "2022-01-10 00:00:00",
            'updated_at' => "2022-01-10 00:00:00",
        ]);
        // チャットルームの取得
        $response = $this->actingAs($user1)->json('GET', 'api/room/private');
        $response->assertStatus(200);
        $response->assertJson([
            [
                "room_id" => $room1->id,
                "first_name" => "first2",
                "last_name" => "last2",
            ], [
                "room_id" => $room2->id,
                "first_name" => "first3",
                "last_name" => "last3",
            ],
        ]);
    }

    /**
     * @test
     */
    public function getRoomByNotLoginUser()
    {
        // チャットルームの取得
        $response = $this->json('GET', 'api/room/private');
        $response->assertStatus(401);
    }
}
