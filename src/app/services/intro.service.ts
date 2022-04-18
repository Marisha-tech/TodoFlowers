import {Injectable} from '@angular/core';
import * as introJS from 'node_modules/intro.js/intro.js'

@Injectable({
  providedIn: 'root'
})

// класс для работы с intro - выделение областей страницы и их описание
export class IntroService {

  // для сохранения в localStorage
  private static INTRO_VIEWED_KEY = 'intro-viewed' // ключ
  private static INTRO_VIEWED_VALUE = 'done' // значение

  private introJS = introJS() // объект по работе с intro

  constructor() {
  }

//  показать интро (справку) c подсветкой элементов
  public startIntroJS(checkViewed: boolean) {

    //  если ранее пользователь уже посмотрел интро, то больше не показывать
    if (checkViewed === true && localStorage.getItem(IntroService.INTRO_VIEWED_KEY) === IntroService.INTRO_VIEWED_VALUE) {
      return
    }

    this.introJS.setOptions(
      // {
      //   nextLabel: 'след. >',
      //   prevLabel: '< пред.',
      //   doneLabel: 'Выход',
      //   skipLabel: 'Выход',
      //   exitOnEsc: true,
      //   exitOnOverlayClick: false
      // }
      {
        steps: [
          {
            title: 'Список категорий',
            element: document.querySelector('.navbar'),
            intro: 'Фильтрация задач, добавление/удаление/редактирование категорий',
            position: 'right',
            showProgress: true,
          },
          {
            title: 'Список задач',
            element: document.querySelector('.task__intro'),
            intro: 'Список всех задач с возможностью редактирования!'
          }
          ]
      }
    )

    this.introJS.start()

    // при закрытии - записываем информацию об этом, чтобы в след раз не открывать intro снова
    this.introJS.onexit(_ => localStorage.setItem(IntroService.INTRO_VIEWED_KEY, IntroService.INTRO_VIEWED_VALUE))
  }
}
