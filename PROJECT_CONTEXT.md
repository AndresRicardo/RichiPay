# RichiFlow - Context del Proyecto

## Objetivo general

Aplicación web para gestionar obligaciones de pago mensuales. Permite crear obligaciones recurrentes, generar listados mensuales, marcar como pagadas, guardar historial y consultar meses anteriores.

## Stack tecnológico

- **React** 19.2.6
- **Vite** 8.0.12
- **JavaScript** (sin TypeScript)
- **TailwindCSS** 4.3.0
- **Zustand** 5.0.14 (gestión de estado)
- **localStorage** (persistencia)
- **git** (control de versiones)

## Arquitectura actual

```
src/
├── components/
│   ├── Header.jsx          # Header principal con título
│   ├── MonthlyList.jsx     # Lista mensual de obligaciones
│   ├── PaymentCard.jsx     # Tarjeta individual de obligación
│   ├── FloatingButton.jsx  # Botón flotante para agregar
│   ├── MonthNavigator.jsx  # Navegación entre meses
│   └── ObligationModal.jsx # Modal crear/editar obligación
├── store/
│   └── useObligationsStore.js  # Store Zustand con payments y lógica de filtrado
├── App.jsx                 # Componente raíz con navegación de meses
├── index.css               # Tailwind + variables CSS
└── main.jsx                # Entry point
```

## Convenciones importantes

- **Mobile first**: clases base para móvil, `md:`/`lg:` para pantallas mayores
- **Max-width**: `max-w-lg` (448px) para el contenedor principal
- **Colores**: CSS variables en `:root` para consistencia
- **Nombres de archivos**: PascalCase para componentes, camelCase para funciones/hooks
- **Estado local**: `useState` para UI (modales, formularios)
- **Estado global**: Zustand store para obligaciones
- **Sin backend**: localStorage como almacenamiento temporal

## Decisiones técnicas tomadas

1. **TailwindCSS v4** con plugin `@tailwindcss/vite` (no config file tradicional)
2. **Zustand con middleware `persist`** para sincronizar con localStorage automáticamente
3. **ID con `uuid` v4** para obligaciones únicas
4. **Modal simple en lugar de librería externa** para mantener minimalismo
5. **Estructura plana** de componentes (sin sub-carpetas excesivas)
6. **monthKey** como string "YYYY-MM" para identificar meses sin ambigüedad
7. **Sistema payments** separado de obligations para rastrear pago por mes
8. **Tipos de obligación**: `recurring` (se muestra desde startMonth en adelante) y `occasional` (meses específicos)

## Estructuras de datos

**Obligation:**
```js
{
  id, name, amount, dueDay,
  type: 'recurring' | 'occasional',
  startMonth: 'YYYY-MM',
  applicableMonths: [1,2,3...] // solo para occasional
}
```

**Payment:**
```js
{ id, obligationId, monthKey: "YYYY-MM", paid: boolean, paidAt: ISO date | null }
```

## Lógica de filtrado

```
shouldShowObligation(obligation, currentDate):
  1. Si currentMonthKey < startMonth → NO mostrar
  2. Si type === 'recurring' → MOSTRAR
  3. Si type === 'occasional' → MOSTRAR solo si currentMonthNumber ∈ applicableMonths
```

## Fases del proyecto

| Fase | Estado | Descripción |
|------|--------|-------------|
| FASE 1 | ✅ Completada | Layout inicial, header, diseño mobile-first |
| FASE 2 | ✅ Completada | CRUD obligaciones con Zustand + localStorage |
| FASE 3 | ✅ Completada | Navegación entre meses + marcar pagada |
| FASE 4 | ⏳ Pendiente | Historial y consulta de meses anteriores |

## Estado actual del desarrollo

**Último commit**: `feat: obligaciones recurrentes y ocasionales con filtrado por mes`

### Funcionalidades implementadas

1. Layout responsive con header y contenedor principal
2. Botón flotante "+" para agregar obligación
3. Listado vacío inicial cuando no hay obligaciones
4. Store de obligaciones con persistencia en localStorage
5. Modal de creación y edición de obligaciones
6. Eliminar obligación
7. Navegación entre meses (prev/next)
8. Marcar obligación como pagada por mes
9. Tipos de obligación: **Recurrente** (se muestra desde startMonth en adelante) y **Ocasional** (meses específicos con checkboxes)
10. Badge visual en tarjetas indicando tipo (R=Recurrente, O=Ocasional)
11. startMonth editable para obligaciones recurrentes
12. applicableMonths editable para obligaciones ocasionales

## Funcionalidades pendientes

1. ~~Marcar obligación como pagada~~ ✅
2. ~~Generación de listado mensual~~ ✅
3. ~~Navegación entre meses~~ ✅
4. Tipos de obligación (recurrente/ocasional) ✅
5. Historial de meses anteriores (ver todos los meses con sus estados de pago)
6. Persistencia más robusta (backend futuro)
7. Autenticación de usuarios

## Próximos pasos sugeridos

1. **FASE 4**: Implementar vista de historial con resumen de pagos por mes
2. Considerar: validación de formulario (nombre requerido, valor > 0, día 1-31)
3. Considerar: exportar datos a CSV o PDF
4. Considerar: notificaciones de recordatorio de pago

## Paleta de colores

```css
--color-primary: #1e3a5f    /* Azul header */
--color-accent: #10b981     /* Verde esmeralda (botón+) */
--color-bg: #f3f4f6         /* Gris fondo */
--color-card: #ffffff       /* Blanco tarjetas */
--color-text: #374151       /* Gris texto principal */
--color-text-light: #6b7280 /* Gris texto secundario */
--color-amount: #2563eb     /* Azul valores/precios */
--color-recurring: #2563eb  /* Azul para badge Recurrente */
--color-occasional: #f59e0b /* Amber para badge Ocasional */
```