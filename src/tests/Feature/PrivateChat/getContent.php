<?php

namespace Tests\Feature\PrivateChat;

use App\Models\PrivateChatContent;
use App\Models\PrivateChatRoom;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class getContent extends TestCase
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
    public function getContent()
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
        // チャットルームの作成
        $room_id = 1;
        $room1 = PrivateChatRoom::factory()->create([
            "id" => $room_id++,
            "user1_id" => $user1->id,
            "user2_id" => $user2->id,
            'created_at' => "2022-01-10 00:00:00",
            'updated_at' => "2022-01-10 00:00:00",
        ]);
        // チャットの内容の作成
        $room_content1 = PrivateChatContent::factory()->create([
            "room_id" => $room1->id,
            "content" => "content1",
            "user_id" => $user1->id,
            "created_at" => "2022-01-10 00:00:00",
            "updated_at" => "2022-01-10 00:00:00",
        ]);
        $room_content2 = PrivateChatContent::factory()->create([
            "room_id" => $room1->id,
            "content" => "content2",
            "user_id" => $user2->id,
            "created_at" => "2022-01-10 00:00:00",
            "updated_at" => "2022-01-10 00:00:00",
        ]);
        // チャットの内容の取得
        $response = $this->actingAs($user1)->json('GET', 'api/room/'.$room1->id.'/content');
        $response->assertStatus(200);
        $response->assertJson([
            [
                "content_id" => $room_content1->id,
                "room_id" => $room1->id,
                "content" => "content1",
                "content_created_at" => "2022-01-10 00:00:00",
                "first_name" => "first1",
                "last_name" => "last1",
            ],
            [
                "content_id" => $room_content2->id,
                "room_id" => $room1->id,
                "content" => "content2",
                "content_created_at" => "2022-01-10 00:00:00",
                "first_name" => "first2",
                "last_name" => "last2",
            ],
        ]);
    }

    /**
     * @test
     */
    public function getContentsByLoginUser()
    {
        // チャットの内容の取得
        $response = $this->json('GET', 'api/room/1/content');
        $response->assertStatus(401);
    }
}
