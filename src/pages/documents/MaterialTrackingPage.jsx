

import { useState } from 'react';
import { Card, CardHeader, CardBody } from '../../components/common/Card';
import { Button, FormSelect } from '../../components';
import { mockProjects as importedProjects } from '../projects/ProjectListPage';
import { useAuth } from '../../hooks/useAuth';
import { usePermissions } from '../../hooks/usePermissions';

// Safe fallback for mockProjects in case import fails
const mockProjects = importedProjects && Array.isArray(importedProjects) ? importedProjects : [];

const initialProjects = [];

// Dummy inventory materials for demo/placeholder
const DUMMY_MATERIALS = [
  { id: 1, name: 'Portland Cement', required: 500, available: 450, unit: 'bags' },
  { id: 2, name: 'Steel Reinforcement Bars (12mm)', required: 2000, available: 1850, unit: 'kg' },
  { id: 3, name: 'Concrete Sand', required: 300, available: 280, unit: 'cubic meters' },
  { id: 4, name: 'Crushed Aggregates', required: 250, available: 220, unit: 'cubic meters' },
  { id: 5, name: 'Ready Mix Concrete', required: 150, available: 120, unit: 'cubic meters' },
  { id: 6, name: 'Plywood Sheets (18mm)', required: 400, available: 350, unit: 'sheets' },
  { id: 7, name: 'Steel Formwork', required: 1500, available: 1400, unit: 'sq meters' },
  { id: 8, name: 'Electrical Wiring (2.5mm)', required: 5000, available: 4500, unit: 'meters' },
  { id: 9, name: 'PVC Pipes (50mm)', required: 800, available: 750, unit: 'meters' },
  { id: 10, name: 'Clay Bricks', required: 50000, available: 45000, unit: 'pieces' },
  { id: 11, name: 'Glass Panels (6mm)', required: 1200, available: 1100, unit: 'sq meters' },
  { id: 12, name: 'Paint/Coating', required: 200, available: 180, unit: 'liters' },
];

export default function MaterialTrackingPage() {
  const { user } = useAuth()
  const { hasRole } = usePermissions()
  
  // Determine if engineer
  const isEngineer = hasRole('project_engineer')
  
  // Initialize with dummy project if engineer
  const getInitialProjects = () => {
    if (!isEngineer) return initialProjects
    
    // For engineers, create a dummy project with materials
    return [
      {
        id: 1,
        name: 'Westwood Tower Phase 1',
        code: 'WTP-001',
        materials: DUMMY_MATERIALS.map(mat => ({
          ...mat,
          id: 'mat_' + mat.id, // Ensure unique IDs
        })),
      },
    ]
  }
  
  const [projects, setProjects] = useState(getInitialProjects);
  const [newMaterial, setNewMaterial] = useState({});
  const [showAddProject, setShowAddProject] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [editProjectId, setEditProjectId] = useState(null);
  const [editMaterials, setEditMaterials] = useState([]);

  // Get available projects for adding (engineers can't add, only ops/admin)
  const getAvailableProjects = () => {
    return mockProjects.filter(p => !projects.some(tracked => tracked.id === p.id))
  }

  // Handler for adding a material to a project
  const handleAddMaterial = (projectId) => {
    const mat = newMaterial[projectId];
    if (!mat?.name || !mat?.required || !mat?.unit) return;
    const nextProjects = projects.map((proj) =>
      proj.id === projectId
        ? {
            ...proj,
            materials: [
              ...proj.materials,
              {
                id: Date.now(),
                name: mat.name,
                required: Number(mat.required),
                available: 0,
                unit: mat.unit,
              },
            ],
          }
        : proj
    );
    setProjects(nextProjects);
    setNewMaterial((prev) => ({ ...prev, [projectId]: { name: '', required: '', unit: '' } }));
  };

  // Handler for removing a material from a project
  const handleRemoveMaterial = (projectId, materialId) => {
    setProjects((prev) => prev.map((proj) =>
      proj.id === projectId
        ? { ...proj, materials: proj.materials.filter((mat) => mat.id !== materialId) }
        : proj
    ));
  };

  // Handler for showing add project form
  const handleShowAddProject = () => {
    setShowAddProject(true);
    setSelectedProjectId('');
  };

  // Handler for adding a new project from system list
  const handleAddProject = (e) => {
    e.preventDefault();
    if (!selectedProjectId) return;
    const projectToAdd = mockProjects.find(p => p.id === selectedProjectId);
    if (!projectToAdd) return;
    setProjects(prev => [
      ...prev,
      {
        id: projectToAdd.id,
        name: projectToAdd.name,
        code: projectToAdd.code,
        materials: [],
      },
    ]);
    setShowAddProject(false);
    setSelectedProjectId('');
  };

  // Handler for editing a project's materials
  const handleEditProject = (project) => {
    setEditProjectId(project.id);
    setEditMaterials(project.materials.map((mat) => ({ ...mat })));
  };

  // Handler for saving edited materials
  const handleSaveEditMaterials = () => {
    setProjects((prev) => prev.map((proj) =>
      proj.id === editProjectId
        ? { ...proj, materials: editMaterials }
        : proj
    ));
    setEditProjectId(null);
    setEditMaterials([]);
  };

  // Handler for editing a material in edit mode
  const handleEditMaterialChange = (idx, field, value) => {
    setEditMaterials((prev) => prev.map((mat, i) =>
      i === idx ? { ...mat, [field]: field === 'required' || field === 'available' ? Number(value) : value } : mat
    ));
  };

  // Handler for removing a material in edit mode
  const handleRemoveEditMaterial = (idx) => {
    setEditMaterials((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-10 max-w-5xl mx-auto py-8">
      <Card>
        <CardHeader title="Material Tracking" />
        <CardBody>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-dark-900 mb-1">Material Tracking</h2>
              <p className="text-dark-600 text-base font-medium">{isEngineer ? 'Track and manage material inventory for your assigned project.' : 'Monitor and update material inventory for each project. Only projects in the system can be tracked.'}</p>
            </div>
            {!isEngineer && (
              <Button 
                size="lg" 
                variant="primary" 
                onClick={() => setShowAddProject(true)} 
                className="font-semibold shadow-md"
              >
                + Add Project
              </Button>
            )}
          </div>

          {/* Add Project Form - Only shown to non-engineers */}
          {showAddProject && !isEngineer && (
            <form className="mb-8 flex flex-col md:flex-row gap-3 md:items-end bg-dark-50 p-4 rounded-xl border border-dark-100" onSubmit={handleAddProject}>
              <FormSelect
                label="Select Project"
                className="min-w-[220px] flex-1"
                value={selectedProjectId}
                onChange={e => setSelectedProjectId(e.target.value)}
                options={getAvailableProjects()
                  .map(p => ({ value: p.id, label: `${p.name} (${p.code})` }))}
                required
              />
              <div className="flex gap-2">
                <Button size="md" type="submit" variant="primary">Add</Button>
                <Button size="md" type="button" variant="secondary" onClick={() => setShowAddProject(false)}>Cancel</Button>
              </div>
            </form>
          )}

          <div className="space-y-8">
            {projects.map((project) => (
              <div key={project.id} className="bg-white rounded-xl shadow-sm border border-dark-100">
                <div className="flex items-center justify-between px-6 pt-6 pb-2">
                  <h3 className="text-lg font-bold text-dark-900">{project.name}</h3>
                  <Button
                    size="md"
                    variant="primary"
                    className="font-semibold shadow-md px-6 py-2 rounded-lg transition-colors duration-150 hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-400"
                    onClick={() => handleEditProject(project)}
                  >
                    <span className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5h2m-1 0v14m-7-7h14" /></svg>
                      Edit Materials
                    </span>
                  </Button>
                </div>
                <div className="overflow-x-auto px-6 pb-6">
                  {/* Add Material Form (only if not editing this project) */}
                  {editProjectId !== project.id && (
                    <form
                      className="flex flex-wrap gap-3 mb-4 items-end bg-dark-50 p-4 rounded-xl border border-dark-100"
                      onSubmit={e => {
                        e.preventDefault();
                        handleAddMaterial(project.id);
                      }}
                    >
                      <div className="flex flex-col gap-1">
                        <label className="text-dark-700 text-sm font-semibold">Material Name</label>
                        <input
                          className="border border-dark-200 rounded-lg px-3 py-2 text-base min-w-[160px] focus:outline-none focus:ring-2 focus:ring-yellow-300 bg-white text-dark-900 placeholder:text-dark-300"
                          placeholder="e.g. Cement"
                          value={newMaterial[project.id]?.name || ''}
                          onChange={e => setNewMaterial((prev) => ({ ...prev, [project.id]: { ...prev[project.id], name: e.target.value } }))}
                          required
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-dark-700 text-sm font-semibold">Required</label>
                        <input
                          className="border border-dark-200 rounded-lg px-3 py-2 text-base w-28 focus:outline-none focus:ring-2 focus:ring-yellow-300 bg-white text-dark-900 placeholder:text-dark-300"
                          type="number"
                          min="1"
                          placeholder="Qty"
                          value={newMaterial[project.id]?.required || ''}
                          onChange={e => setNewMaterial((prev) => ({ ...prev, [project.id]: { ...prev[project.id], required: e.target.value } }))}
                          required
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-dark-700 text-sm font-semibold">Unit</label>
                        <input
                          className="border border-dark-200 rounded-lg px-3 py-2 text-base w-28 focus:outline-none focus:ring-2 focus:ring-yellow-300 bg-white text-dark-900 placeholder:text-dark-300"
                          placeholder="e.g. bags"
                          value={newMaterial[project.id]?.unit || ''}
                          onChange={e => setNewMaterial((prev) => ({ ...prev, [project.id]: { ...prev[project.id], unit: e.target.value } }))}
                          required
                        />
                      </div>
                      <Button size="md" type="submit" variant="primary" className="font-semibold">Add Material</Button>
                    </form>
                  )}

                  {/* Edit Materials Table */}
                  {editProjectId === project.id ? (
                    <div className="bg-dark-50 p-4 rounded-xl border border-dark-100">
                      <table className="min-w-full text-base mb-2">
                        <thead>
                          <tr className="bg-dark-100 text-dark-700">
                            <th className="px-4 py-2 text-left">Material</th>
                            <th className="px-4 py-2 text-right">Required</th>
                            <th className="px-4 py-2 text-right">Available</th>
                            <th className="px-4 py-2 text-right">Unit</th>
                          </tr>
                        </thead>
                        <tbody>
                          {editMaterials.map((mat, idx) => (
                            <tr key={mat.id}>
                              <td className="px-4 py-2">
                                <input
                                  className="border border-dark-200 rounded-lg px-3 py-2 text-base w-full bg-white text-dark-900"
                                  value={mat.name}
                                  onChange={e => handleEditMaterialChange(idx, 'name', e.target.value)}
                                />
                              </td>
                              <td className="px-4 py-2">
                                <input
                                  className="border border-dark-200 rounded-lg px-3 py-2 text-base w-full bg-white text-dark-900"
                                  type="number"
                                  min="1"
                                  value={mat.required}
                                  onChange={e => handleEditMaterialChange(idx, 'required', e.target.value)}
                                />
                              </td>
                              <td className="px-4 py-2">
                                <input
                                  className="border border-dark-200 rounded-lg px-3 py-2 text-base w-full bg-white text-dark-900"
                                  type="number"
                                  min="0"
                                  value={mat.available}
                                  onChange={e => handleEditMaterialChange(idx, 'available', e.target.value)}
                                />
                              </td>
                              <td className="px-4 py-2">
                                <input
                                  className="border border-dark-200 rounded-lg px-3 py-2 text-base w-full bg-white text-dark-900"
                                  value={mat.unit}
                                  onChange={e => handleEditMaterialChange(idx, 'unit', e.target.value)}
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="flex gap-2 mt-2">
                        <Button size="md" variant="primary" onClick={handleSaveEditMaterials} className="font-semibold">Save</Button>
                        <Button size="md" variant="secondary" onClick={() => setEditProjectId(null)}>Cancel</Button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <table className="min-w-full text-base border-collapse">
                        <thead>
                          <tr className="bg-gradient-to-r from-blue-50 to-blue-100 border-b-2 border-blue-200">
                            <th className="px-4 py-3 text-left text-dark-900 font-bold">Material</th>
                            <th className="px-4 py-3 text-center text-dark-900 font-bold">Required</th>
                            <th className="px-4 py-3 text-center text-dark-900 font-bold">Available</th>
                            <th className="px-4 py-3 text-center text-dark-900 font-bold">Utilization</th>
                            <th className="px-4 py-3 text-center text-dark-900 font-bold">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {project.materials.length === 0 && (
                            <tr><td colSpan={5} className="text-center text-dark-400 py-8 italic">No materials in inventory.</td></tr>
                          )}
                          {project.materials.map((mat, idx) => {
                            const utilization = Math.round((mat.available / mat.required) * 100);
                            const isLow = mat.available < mat.required;
                            const isCritical = utilization < 30;
                            const isWarning = utilization < 70;
                            
                            // Determine row background
                            let rowBg = 'bg-white';
                            if (isCritical) rowBg = 'bg-red-50';
                            else if (isWarning) rowBg = 'bg-yellow-50';
                            else rowBg = 'bg-green-50';
                            
                            // Status badge styling
                            let statusBg = 'bg-green-100', statusText = 'text-green-700', statusLabel = 'In Stock';
                            if (isCritical) {
                              statusBg = 'bg-red-100';
                              statusText = 'text-red-700';
                              statusLabel = 'Critical';
                            } else if (isWarning) {
                              statusBg = 'bg-amber-100';
                              statusText = 'text-amber-700';
                              statusLabel = 'Low Stock';
                            }
                            
                            // Progress bar color
                            let barColor = 'bg-green-500';
                            if (isCritical) barColor = 'bg-red-500';
                            else if (isWarning) barColor = 'bg-amber-500';
                            
                            return (
                              <tr key={mat.id} className={`${rowBg} border-b border-dark-100 hover:shadow-sm transition-shadow`}>
                                <td className="px-4 py-4 font-semibold text-dark-900">{mat.name}</td>
                                <td className="px-4 py-4 text-center text-dark-800 font-medium">{mat.required.toLocaleString()}</td>
                                <td className="px-4 py-4 text-center text-dark-800 font-medium">{mat.available.toLocaleString()}</td>
                                <td className="px-4 py-4">
                                  <div className="flex items-center gap-3">
                                    <div className="flex-1">
                                      <div className="w-full bg-dark-200 rounded-full h-2 overflow-hidden">
                                        <div
                                          className={`${barColor} h-2 rounded-full transition-all duration-300`}
                                          style={{ width: `${Math.min(utilization, 100)}%` }}
                                        />
                                      </div>
                                    </div>
                                    <span className={`text-xs font-bold whitespace-nowrap px-2 py-1 rounded-lg ${statusBg} ${statusText}`}>
                                      {utilization}%
                                    </span>
                                  </div>
                                </td>
                                <td className="px-4 py-4 text-center">
                                  <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold ${statusBg} ${statusText} shadow-sm`}>
                                    {isCritical && <span className="animate-pulse">●</span>}
                                    {statusLabel}
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                      
                      {/* Summary Stats */}
                      {project.materials.length > 0 && (
                        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                            <p className="text-dark-600 text-sm font-semibold mb-1">Total Materials</p>
                            <p className="text-3xl font-bold text-blue-900">{project.materials.length}</p>
                          </div>
                          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
                            <p className="text-dark-600 text-sm font-semibold mb-1">In Stock</p>
                            <p className="text-3xl font-bold text-green-900">
                              {project.materials.filter(m => m.available >= m.required).length}
                            </p>
                          </div>
                          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-4 border border-red-200">
                            <p className="text-dark-600 text-sm font-semibold mb-1">Critical/Low Stock</p>
                            <p className="text-3xl font-bold text-red-900">
                              {project.materials.filter(m => m.available < m.required).length}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}





