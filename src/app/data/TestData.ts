//тестовый данные в виде массивов (заменяют таблицы БД)
import {Category} from "../model/Category";
import {Priority} from "../model/Priority";
import {Task} from '../model/Task';

export class TestData {
  static categories: Category[] = [
    // {id: 1, title: 'Работа'},
    // {id: 2, title: 'Семья'},
    // {id: 3, title: 'Учеба'},
    // {id: 4, title: 'Отдых'},
    // {id: 5, title: 'Спорт'},
    // {id: 6, title: 'Еда'},
    // {id: 7, title: 'Финансы'},
    // {id: 8, title: 'Гаджеты'},
    // {id: 9, title: 'Здоровье'},
    // {id: 10, title: 'Автомобиль'},
    {id: 1, title: 'Все растения'},
    {id: 2, title: 'Алоэ'},
    {id: 3, title: 'Земляника'},
    {id: 4, title: 'Редис'},
    {id: 5, title: 'Огурец'},
    {id: 6, title: 'Орхидея'},
    {id: 7, title: 'Перец'},
    {id: 8, title: 'Рассада'},
    {id: 9, title: 'Томат'},
    {id: 10, title: 'Баклажан'},
  ]

  static priorities: Priority[] = [
    {id: 1, title: 'Низкий', color: '#e5e5e5'},
    {id: 2, title: 'Средний', color: '#85d1b2'},
    {id: 3, title: 'Высокий', color: '#f1828d'},
    {id: 4, title: 'Срочный', color: '#f1128d'},
  ]

  static tasks: Task[] = [
    {
      id: 1,
      title: 'Полить',
      priority: TestData.priorities[2],
      completed: false,
      category: TestData.categories[9],
      date: new Date('2022-04-10')
    },

    {
      id: 2,
      title: 'Подкормить',
      priority: TestData.priorities[0],
      completed: false,
      category: TestData.categories[0],
      date: new Date('2022-04-11')
    },

    {
      id: 3,
      title: 'Опрыскать',
      priority: TestData.priorities[2],
      completed: true,
      category: TestData.categories[1]
    },

    {
      id: 4,
      title: 'Посадить',
      priority: TestData.priorities[1],
      completed: false,
      category: TestData.categories[1],
      date: new Date('2022-08-17')
    },

    {
      id: 5,
      title: 'Пикировать',
      completed: false,
      category: TestData.categories[2]
    },

    {
      id: 6,
      title: 'Посеять',
      priority: TestData.priorities[1],
      completed: true,
      category: TestData.categories[2],
      date: new Date('2022-06-11')
    },

    {
      id: 7,
      title: 'Обрезать',
      priority: TestData.priorities[2],
      completed: false,
      category: TestData.categories[3]
    },

    {
      id: 8,
      title: 'Размножить',
      completed: false,
      category: TestData.categories[5]
    },

    {
      id: 9,
      title: 'Делить',
      priority: TestData.priorities[2],
      completed: false,
      category: TestData.categories[4],
      date: new Date('2022-03-12')
    },

    {
      id: 10,
      title: 'Замачивать',
      priority: TestData.priorities[0],
      completed: true,
      category: TestData.categories[4]
    },

    {
      id: 11,
      title: 'Полить',
      completed: false
    },

    {
      id: 12,
      title: 'Обработать',
      priority: TestData.priorities[1],
      completed: false,
      category: TestData.categories[2]
    },

    {
      id: 13,
      title: 'Подкормить',
      priority: TestData.priorities[2],
      completed: false,
      category: TestData.categories[5],
      date: new Date('2022-05-11')
    },

    {
      id: 14,
      title: 'Опрыскать',
      completed: true,
      category: TestData.categories[0]
    },

    {
      id: 15,
      title: 'Опрыскать',
      priority: TestData.priorities[2],
      completed: true
    },

    {
      id: 16,
      title: 'Посеять',
      priority: TestData.priorities[3],
      completed: false,
      category: TestData.categories[6]
    },

    {
      id: 17,
      title: 'Размножить',
      priority: TestData.priorities[2],
      completed: false,
      category: TestData.categories[6]
    },

    {
      id: 18,
      title: 'Обработка (от болезней/ вредителей)',
      priority: TestData.priorities[3],
      completed: false,
      category: TestData.categories[8],
      date: new Date('2020-12-11')

    },

    {
      id: 19,
      title: 'Полить',
      priority: TestData.priorities[0],
      completed: false,
      category: TestData.categories[7],
      date: new Date('2022-10-11')

    },

    {
      id: 20,
      title: 'Пересадить',
      priority: TestData.priorities[0],
      completed: false,
      category: TestData.categories[4],
      date: new Date('2022-03-17')

    },
    {
      id: 21,
      title: 'Полить',
      priority: TestData.priorities[0],
      completed: false,
      category: TestData.categories[4],
      date: new Date('2022-03-17')

    },
    {
      id: 22,
      title: 'Подкормить',
      priority: TestData.priorities[1],
      completed: false,
      category: TestData.categories[2],
      date: new Date('2022-03-17')

    }
  ];
}
