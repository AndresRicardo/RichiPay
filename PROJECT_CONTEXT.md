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
│   └── FloatingButton.jsx  # Botón flotante para agregar
├── store/
│   └── useObligationsStore.js  # Store Zustand (FASE 2+)
├── App.jsx                 # Componente raíz y layout
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
3. **ID con `crypto.randomUUID()`** para obligaciones únicas
4. **Modal simple en lugar de librería externa** para mantener minimalismo
5. **Estructura plana** de componentes (sin sub-carpetas excesivas)

## Fases del proyecto

| Fase | Estado | Descripción |
|------|--------|-------------|
| FASE 1 | ✅ Completada | Layout inicial, header, diseño mobile-first |
| FASE 2 | 🔄 En desarrollo | CRUD obligaciones con Zustand + localStorage |
| FASE 3 | ⏳ Pendiente | Generación de listado mensual |
| FASE 4 | ⏳ Pendiente | Historial y consulta de meses anteriores |

## Estado actual del desarrollo

**FASE 2 - CRUD de Obligaciones** (en progreso)

### Completado en FASE 2
- Store Zustand con localStorage
- Modal para crear/editar obligaciones
- Conexión FloatingButton → Modal
- PaymentCard con acciones editar/eliminar

### Pendiente en FASE 2
- Ninguno

## Funcionalidades implementadas

1. Layout responsive con header y contenedor principal
2. Botón flotante "+" para agregar obligación
3. Listado vacío inicial cuando no hay obligaciones
4. Store de obligaciones con persistencia en localStorage
5. Modal de creación y edición de obligaciones
6. Eliminar obligación

## Funcionalidades pendientes

1. Marcar obligación como pagada
2. Generación de listado mensual (filtrar por mes)
3. Navegación entre meses
4. Historial de meses anteriores
5. Persistencia más robusta (backend futuro)
6. Autenticación de usuarios

## Próximos pasos sugeridos

1. **FASE 2.1**: Conectar el edit desde PaymentCard al modal (pasando datos)
2. **FASE 3**: Implementar selector de mes y filtrado de obligaciones por mes
3. **FASE 4**: Agregar paginación/consulta de historial de meses
4. Considerar: validación de formulario (nombre requerido, valor > 0, día 1-31)

## Paleta de colores

```css
--color-primary: #1e3a5f    /* Azul header */
--color-accent: #10b981     /* Verde esmeralda (botón+) */
--color-bg: #f3f4f6         /* Gris fondo */
--color-card: #ffffff       /* Blanco tarjetas */
--color-text: #374151       /* Gris texto principal */
--color-text-light: #6b7280 /* Gris texto secundario */
--color-amount: #2563eb     /* Azul valores/precios */
```
