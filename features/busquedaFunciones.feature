#---------------------------ATDD--------------------------
#Enunciado:
#Multicine.com.bo necesita que los clientes encuentren rápidamente las funciones disponibles,
#exigiendo al menos el filtro de ciudad para evitar búsquedas ambiguas.

#AC1: El usuario debe poder buscar funciones filtrando por ciudad, fecha e idioma (doblada o subtitulada).
#AC2: La búsqueda debe requerir como mínimo el filtro de ciudad para poder ejecutarse.
#AC3: Los resultados deben mostrarse ordenados por el horario mas proximo.
#comando para ejecucion: npm run gherkin
#

#---------------------BDD--------------------------------------------------
Feature: Búsqueda y filtrado de funciones

  Como cliente del cine
  Quiero buscar funciones por ciudad, cine, fecha e idioma
  Para encontrar rápidamente el horario que me conviene

  Scenario: Buscar funciones por ciudad usando el selector de ubicación
    Given abro la página principal de Multicine
    When selecciono la ciudad "Santa Cruz"
    Then debería ver la opción de "Santa Cruz" en el filtro de ubicación

Scenario: Buscar funciones por ciudad - La Paz
    Given abro la página principal de Multicine
    When selecciono la ciudad "La Paz"
    Then debería ver la opción de "La Paz" en el filtro de ubicación

    Scenario: Buscar funciones por ciudad - El Alto
    Given abro la página principal de Multicine
    When selecciono la ciudad "El Alto"
    Then debería ver la opción de "El Alto" en el filtro de ubicación


    #Scenario: Warning para seleccionar una ciudad
    #Given abro la página principal de Multicine
    #When selecciono la ciudad "La Paz"
    #Then debería ver la opción de "La Paz" en el filtro de ubicación
    #And selecciono la ciudad "TODAS LAS UBICACIONES"
    #Then debería ver la opción de "POR FAVOR SELECCIONE UNA UBICACIÓN" en el filtro de ubicación