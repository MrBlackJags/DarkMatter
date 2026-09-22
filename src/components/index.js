/**
 * DARKMATTER OBSERVATORY // Component Barrel Exports
 * Cleanly organized across architectural domains:
 * - Layout (Navbar, HeroLanding, InteractiveStarfield)
 * - Catalog (ObjectCatalog, ObjectDetailModal, CompareObjectsDrawer, CustomObjectLogger, CelestialVisualizer)
 * - Observatory (SkyCoordinateRadar, DiscoveryTimeline, OrbitSimulator, SpaceCalculators)
 * - Reference (DataDictionaryBar, DataPipelineDashboard)
 */

// 1. Layout & Ambient Cosmos
export { default as Navbar } from './layout/Navbar';
export { default as HeroLanding } from './layout/HeroLanding';
export { default as InteractiveStarfield } from './layout/InteractiveStarfield';

// 2. Catalog & Procedural Visuals
export { default as ObjectCatalog } from './catalog/ObjectCatalog';
export { default as ObjectDetailModal } from './catalog/ObjectDetailModal';
export { default as CompareObjectsDrawer } from './catalog/CompareObjectsDrawer';
export { default as CustomObjectLogger } from './catalog/CustomObjectLogger';
export { default as CelestialVisualizer } from './catalog/CelestialVisualizer';

// 3. Observatory Suite & Scientific Instruments
export { default as SkyCoordinateRadar } from './observatory/SkyCoordinateRadar';
export { default as DiscoveryTimeline } from './observatory/DiscoveryTimeline';
export { default as OrbitSimulator } from './observatory/OrbitSimulator';
export { default as SpaceCalculators } from './observatory/SpaceCalculators';

// 4. Reference, Data Dictionary & Telemetry Ingestion
export { default as DataDictionaryBar } from './reference/DataDictionaryBar';
export { default as DataPipelineDashboard } from './reference/DataPipelineDashboard';
