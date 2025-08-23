/**
 * Interfaz que define la estructura de una tarea individual
 * 
 * Propiedades:
 * - id: Identificador único generado automáticamente
 * - text: Contenido de la tarea introducido por el usuario
 * - completed: Estado de completado (true/false)
 * - createdAt: Timestamp de creación para ordenamiento y auditoría
 */
export interface Todo {
  /** Identificador único de la tarea (UUID) */
  id: string;
  /** Texto descriptivo de la tarea */
  text: string;
  /** Estado de completado de la tarea */
  completed: boolean;
  /** Fecha y hora de creación de la tarea */
  createdAt: Date;
}

/**
 * Tipo unión que define los filtros disponibles para mostrar tareas
 * 
 * Valores posibles:
 * - 'all': Muestra todas las tareas sin filtro
 * - 'active': Muestra solo las tareas no completadas
 * - 'completed': Muestra solo las tareas completadas
 */
export type FilterType = 'all' | 'active' | 'completed';