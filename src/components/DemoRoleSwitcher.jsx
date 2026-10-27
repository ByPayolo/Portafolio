import React, { useState, useEffect } from 'react';

/**
 * Roles de prueba configurados para EasyWay Virtual Platform
 * Usando Hash Router: las rutas usan el prefijo '#' para navegar
 * dentro de la SPA sin provocar peticiones HTTP 404 al servidor estático.
 */
const DEMO_ROLES = [
  {
    role: 'Admin',
    label: 'Admin',
    badge: 'Full Control',
    icon: '🛡️',
    path: '#/admin',
    colorClasses: 'from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-indigo-500/25',
    userData: {
      id: 1,
      user_id: 1,
      userId: 1,
      name: 'Paolo Mata (Admin)',
      email: 'admin@easyway.com',
      role: 'Admin',
      rol_id: 1
    }
  },
  {
    role: 'Teacher',
    label: 'Teacher',
    badge: 'Attendance & Groups',
    icon: '👨‍🏫',
    path: '#/teacher/dashboard',
    colorClasses: 'from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-500/25',
    userData: {
      id: 3,
      user_id: 3,
      userId: 3,
      name: 'Prof. Carlos Mendoza',
      email: 'teacher@easyway.com',
      role: 'Teacher',
      rol_id: 3
    }
  },
  {
    role: 'Student',
    label: 'Student',
    badge: 'Classroom & Materials',
    icon: '🎓',
    path: '#/student/dashboard',
    colorClasses: 'from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-blue-500/25',
    userData: {
      id: 2,
      user_id: 2,
      userId: 2,
      name: 'Ana García (Student)',
      email: 'student@easyway.com',
      role: 'Student',
      rol_id: 2
    }
  }
];

/**
 * Componente flotante DemoRoleSwitcher
 *
 * @param {Object} props
 * @param {boolean} [props.forceVisible] - Si es true, se muestra sin importar la ruta actual.
 * @param {string[]} [props.visiblePaths] - Rutas permitidas (por defecto: ['/login', '/welcome', '/', '']).
 * @param {Function} [props.onRoleSelect] - Callback opcional al seleccionar un rol.
 */
export default function DemoRoleSwitcher({
  forceVisible,
  visiblePaths = ['/login', '/welcome', '/', ''],
  onRoleSelect
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [currentHash, setCurrentHash] = useState('');
  const [currentPath, setCurrentPath] = useState('');
  const [activeRole, setActiveRole] = useState(null);

  useEffect(() => {
    const updateLocationState = () => {
      const hash = window.location.hash || '';
      const path = window.location.pathname.toLowerCase();
      setCurrentHash(hash);
      setCurrentPath(path);

      try {
        const storedRole = localStorage.getItem('userRole');
        if (storedRole) setActiveRole(storedRole);
      } catch {
        // Ignorar excepciones al acceder a localStorage
      }
    };

    updateLocationState();

    window.addEventListener('popstate', updateLocationState);
    window.addEventListener('hashchange', updateLocationState);

    return () => {
      window.removeEventListener('popstate', updateLocationState);
      window.removeEventListener('hashchange', updateLocationState);
    };
  }, []);

  // Determinar si la página actual corresponde a Welcome o Login
  // En Hash Router, el hash puede ser '', '#', '#/', '#/login', '#/welcome'
  const isHashAllowed =
    !currentHash ||
    currentHash === '#' ||
    currentHash === '#/' ||
    currentHash.startsWith('#/login') ||
    currentHash.startsWith('#/welcome');

  const isPathAllowed = visiblePaths.some((p) => {
    const normalized = p.toLowerCase();
    if (normalized === '/' || normalized === '') {
      return currentPath === '/' || currentPath === '' || currentPath.endsWith('/index.html');
    }
    return currentPath.includes(normalized);
  });

  const isVisible = forceVisible ?? (isPathAllowed && isHashAllowed);

  if (!isVisible) return null;

  /**
   * Manejador de clic de selección de rol
   * Utiliza EXCLUSIVAMENTE window.location.hash para navegar con HashRouter
   */
  const handleSelectRole = (config) => {
    try {
      // 1. Guardar token ficticio y datos en localStorage
      const mockToken = `mock-demo-jwt-${config.role.toLowerCase()}-${Date.now()}`;
      localStorage.setItem('token', mockToken);
      localStorage.setItem('userRole', config.role);
      localStorage.setItem('userId', String(config.userData.id));
      localStorage.setItem('user', JSON.stringify(config.userData));

      setActiveRole(config.role);

      if (onRoleSelect) {
        onRoleSelect(config);
      }

      // Disparar evento para contextos de autenticación
      window.dispatchEvent(new Event('storage'));

      // 2. Redirección exclusiva mediante Hash Router
      // Esto evita que el navegador solicite rutas inexistentes al servidor de Astro (error 404)
      window.location.hash = config.path;
    } catch (err) {
      console.error('Error al cambiar de rol en DemoRoleSwitcher:', err);
    }
  };

  return (
    <aside
      role="region"
      aria-label="Test role switcher"
      className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2 font-sans select-none"
    >
      {/* Botón minimizador / pill flotante */}
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-full
                     bg-slate-900/90 text-slate-300 hover:text-white
                     border border-slate-700/80 shadow-lg shadow-black/50 backdrop-blur-md
                     transition-all duration-200 hover:scale-105"
          title={isOpen ? 'Minimize demo switcher' : 'Expand demo switcher'}
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="tracking-wide">Demo Roles</span>
          <span className="text-[10px] text-slate-400">
            {isOpen ? '▼' : '▲'}
          </span>
        </button>
      </div>

      {/* Panel con botones de roles */}
      {isOpen && (
        <div
          className="w-72 p-3.5 rounded-2xl
                     bg-slate-900/95 border border-slate-700/80
                     shadow-2xl shadow-black/70 backdrop-blur-xl
                     animate-in fade-in slide-in-from-bottom-2 duration-200"
        >
          {/* Cabecera del panel */}
          <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-slate-800">
            <div className="flex items-center gap-1.5">
              <span className="text-sm">⚡</span>
              <p className="text-xs font-bold text-slate-200 tracking-wide">
                1-Click Demo Login
              </p>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 font-mono border border-indigo-500/30">
              Hash Router
            </span>
          </div>

          <p className="text-[11px] text-slate-400 mb-3 leading-snug">
            Log in directly to the desired role panel without a password:
          </p>

          {/* Lista de botones por cada rol */}
          <div className="flex flex-col gap-2">
            {DEMO_ROLES.map((item) => {
              const isCurrent = activeRole === item.role;
              return (
                <button
                  key={item.role}
                  type="button"
                  onClick={() => handleSelectRole(item)}
                  className={`group relative flex items-center justify-between px-3 py-2.5 rounded-xl
                             border transition-all duration-200 text-left
                             bg-gradient-to-r ${item.colorClasses}
                             ${
                               isCurrent
                                 ? 'ring-2 ring-white/50 border-white/40 shadow-lg'
                                 : 'border-white/10 hover:border-white/25 hover:scale-[1.02] shadow-md'
                             }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base group-hover:scale-110 transition-transform">
                      {item.icon}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold leading-tight flex items-center gap-1.5">
                        {item.label}
                        {isCurrent && (
                          <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-black/40 text-white font-medium">
                            Active
                          </span>
                        )}
                      </span>
                      <span className="text-[10px] text-white/80 leading-tight">
                        {item.badge}
                      </span>
                    </div>
                  </div>

                  <span className="text-xs text-white/70 group-hover:translate-x-0.5 transition-transform">
                    →
                  </span>
                </button>
              );
            })}
          </div>

          {/* Ruta destino explicativa */}
          <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500">
            <span>Routes: #/admin · #/teacher · #/student</span>
            <button
              type="button"
              onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('userRole');
                localStorage.removeItem('user');
                localStorage.removeItem('userId');
                setActiveRole(null);
                window.location.hash = '#/login';
                window.location.reload();
              }}
              className="hover:text-rose-400 transition-colors underline decoration-dotted"
              title="Clear demo session and reset"
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
