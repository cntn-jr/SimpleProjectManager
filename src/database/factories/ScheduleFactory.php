<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ScheduleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $title_num = $this->faker->numberBetween(10, 30);
        $date1 = $this->faker->dateTimeBetween("-1month", "+1month");
        $date2 = $this->faker->dateTimeBetween("-1month", "+1month");
        $start_date = "";
        $end_date = "";
        if ($date1 < $date2) {
            $start_date = $date1;
            $end_date = $date2;
        } else {
            $start_date = $date2;
            $end_date = $date1;
        }
        return [
            'title' => $this->faker->realText($title_num),
            'description' => $this->faker->realText(50),
            'start_date' => $start_date,
            'end_date' => $end_date,
            'type' => 'task',
            'progress' => 100,
        ];
    }
}
