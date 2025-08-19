# Deploy en Vercel - Solución de Errores

## Problema Original

El error `Cannot find module '@babel/preset-env'` ocurría porque las dependencias de Babel estaban en `devDependencies` y Vercel no las instala en producción.

## Soluciones Implementadas

### 1. Mover Dependencias de Babel

Se movieron las siguientes dependencias de `devDependencies` a `dependencies`:

- `@babel/preset-env`
- `@babel/preset-react`
- `@babel/preset-typescript`

### 2. Configuración de Vercel

Se creó `vercel.json` con:

```json
{
  "buildCommand": "npm run build",
  "installCommand": "npm install --legacy-peer-deps",
  "framework": "nextjs",
  "functions": {
    "src/app/api/**/*.ts": {
      "maxDuration": 30
    }
  },
  "env": {
    "NEXT_PUBLIC_API_URL": ""
  }
}
```

### 3. Gitignore Mejorado

Se actualizó `.gitignore` para excluir archivos innecesarios del deploy.

## Pasos para Deploy

### 1. Commit y Push

```bash
git add .
git commit -m "Fix Vercel build: Move Babel dependencies to dependencies"
git push origin main
```

### 2. Configurar Variables de Entorno en Vercel

En el dashboard de Vercel, configura:

- `NEXT_PUBLIC_API_URL`: Deja vacío para usar la misma URL del deploy

### 3. Deploy Automático

Vercel detectará automáticamente los cambios y hará el deploy.

## Verificación

### Build Local

```bash
npm run build
```

Debería completarse sin errores.

### Deploy en Vercel

El build en Vercel debería completarse exitosamente.

## Estructura de Archivos Importante

```
├── package.json          # Dependencias de Babel en dependencies
├── .babelrc             # Configuración de Babel
├── vercel.json          # Configuración de Vercel
├── next.config.ts       # Configuración de Next.js
└── .gitignore           # Archivos excluidos del deploy
```

## Notas Importantes

1. **Dependencias de Babel**: Ahora están en `dependencies` para que Vercel las instale en producción
2. **Build Command**: Usa `npm run build` estándar
3. **Install Command**: Usa `--legacy-peer-deps` para evitar conflictos
4. **Variables de Entorno**: `NEXT_PUBLIC_API_URL` vacío para usar la misma URL

## Troubleshooting

### Si el build sigue fallando:

1. Verifica que las dependencias de Babel estén en `dependencies`
2. Asegúrate de que `vercel.json` esté en la raíz del proyecto
3. Revisa los logs de Vercel para errores específicos

### Si hay problemas de CORS:

1. Configura `allowedDevOrigins` en `next.config.ts`
2. Verifica que las variables de entorno estén configuradas correctamente
