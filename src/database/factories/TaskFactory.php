<?php

namespace Database\Factories;

use App\Models\Task;
use Illuminate\Database\Eloquent\Factories\Factory;

class TaskFactory extends Factory
{

    protected $model = Task::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $title_num = $this->faker->numberBetween(10, 30);
        $priorities = ['low', 'middle', 'high'];
        $prioritiy_num = $this->faker->numberBetween(0, 2);
        return [
            'title' => $this->faker->realText($title_num),
            'description' => $this->faker->realText(50),
            'priority' => $priorities[$prioritiy_num],
            'due' => $this->faker->dateTimeBetween("-1month", "+1month"),
            // 'user_id' => $this->faker->numberBetween(1, 11),
            'user_id' => $this->faker->numberBetween(2, 11),
            'is_finished' => $this->faker->boolean(30)
        ];
    }
}
