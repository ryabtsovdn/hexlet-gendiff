# gendiff

[![Maintainability](https://api.codeclimate.com/v1/badges/61932f59eb215f7de694/maintainability)](https://codeclimate.com/github/dicodingru/project-lvl2-s245/maintainability)
[![Build Status](https://travis-ci.org/AleksandrSerov/gendiff.svg?branch=master)](https://travis-ci.org/AleksandrSerov/gendiff)

## Install

```sh
$ make install
```

## Run tests

```sh
$ make test
```

## Цель

Второй проект является логическим развитием первого. Он захватывает большую часть синтаксических возможностей `js` и использует более сложную архитектуру. Затрагиваемые темы:

- `cli`. В этом проекте вы научитесь создавать `cli` приложения так, как это делается в настоящей жизни, с использованием специальных библиотек, занимающихся парсингом входных параметров, валидацией и генерацией помощи.
- Форматы данных: `json`, `yaml`, `ini`. Кроме понимания самих форматов, вы так же научитесь транслировать данные из `js` в эти форматы и обратно.
- Алгоритмическая подготовка. Вас ждет обработка и трансформация деревьев. Немного кода, кипятящего мозг, никогда не помешает.
- Архитектурные принципы: Фасад, Адаптер. Вы познакомитесь и на практике реализуете одни из самых распространенных подходов при организации кода.
- Полиморфизм
- Функциональное программирование
- Красной нитью сквозь этот проект будет проходить unit-тестирование, а в идеале - разработка через тесты.

## Описание

В рамках данного проекта необходимо реализовать утилиту для поиска отличий в конфигурационных файлах.

Возможности утилиты:

- Поддержка разных форматов
- Генерация отчета в виде `plain text`, `pretty` и `json`

### Пример использования

```console
$ gendiff --format plain first-config.ini second-config.ini
Setting "common.setting2" deleted.
Setting "common.setting4" added with value "blah blah".
Setting "group1.baz" changed from "bas" to "bars".
Section "group2" deleted.
```
