import { Injectable } from '@angular/core';
import { CityData } from './weather-data';

@Injectable({
  providedIn: 'root',
})
export class AutocompleteService {
  constructor() {}

  autocomplete(inputElement: HTMLInputElement, arr: CityData[]) {
    let currentFocus: number;

    inputElement.addEventListener('input', function (e) {
      let dropdown_list, list_element, i;
      const val = this.value;

      closeAllLists();
      if (!val || val.length < 2) {
        return false;
      }

      currentFocus = -1;
      dropdown_list = document.createElement('div');
      dropdown_list.setAttribute('id', 'autocomplete-list');
      dropdown_list.setAttribute('class', 'autocomplete-items');
      this.parentNode?.appendChild(dropdown_list);

      for (i = 0; i < arr.length; i++) {
        if (
          arr[i].name.substr(0, val.length).toUpperCase() === val.toUpperCase()
        ) {
          list_element = document.createElement('div');
          list_element.innerHTML =
            '<strong>' + arr[i].name.substr(0, val.length) + '</strong>';
          list_element.innerHTML += arr[i].name.substr(val.length);
          list_element.innerHTML += ', ' + arr[i].state + ' ' + arr[i].country;
          list_element.innerHTML +=
            "<input type='hidden' value='" + arr[i].id + "'>";
          list_element.addEventListener('click', function (e) {
            inputElement.value = this.getElementsByTagName('input')[0].value;
            closeAllLists();
          });
          dropdown_list.appendChild(list_element);
        }
      }
      return;
    });

    inputElement.addEventListener('keydown', function (e) {
      let list = document.getElementById('autocomplete-list') as any;

      if (list) list = list.getElementsByTagName('div');
      if (e.keyCode == 40) {
        currentFocus++;
        addActive(list);
      } else if (e.keyCode == 38) {
        currentFocus--;
        addActive(list);
      } else if (e.keyCode == 13) {
        e.preventDefault();
        if (currentFocus > -1) {
          if (list) list[currentFocus].click();
        }
      }
    });

    function addActive(list: HTMLCollectionOf<HTMLDivElement>) {
      if (!list) return false;
      removeActive(list);
      if (currentFocus >= list.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = list.length - 1;
      list[currentFocus].classList.add('autocomplete-active');
      return;
    }

    function removeActive(list: HTMLCollectionOf<HTMLDivElement>) {
      for (let i = 0; i < list.length; i++) {
        list[i].classList.remove('autocomplete-active');
      }
    }

    function closeAllLists(element?: any) {
      const list = document.getElementsByClassName('autocomplete-items');
      for (let i = 0; i < list.length; i++) {
        if (element != list[i] && element != inputElement) {
          (list[i] as HTMLElement).parentNode?.removeChild(list[i]);
        }
      }
    }

    document.addEventListener('click', function (e) {
      closeAllLists(e.target);
    });
  }
}
