import { $settings } from '../globals/settings'
import { fromStorage, toStorage } from '../helpers'
import { oneCallAPI } from './api/oneCallAPI'

export function initData(): void {
  Object.assign($settings, fromStorage('settings') ?? {})
  toStorage('settings', $settings)
  void oneCallAPI()
  setInterval(() => oneCallAPI, $settings.api.interval * 1000)
}
