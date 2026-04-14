

import { useState } from 'react';
import { Card, CardHeader, CardBody } from '../../components/common/Card';
import { Button, FormSelect } from '../../components';
import { mockProjects } from '../projects/ProjectListPage';


const initialProjects = [];


export default function MaterialTrackingPage() {
  const [projects, setProjects] = useState(initialProjects);
  const [newMaterial, setNewMaterial] = useState({});
  const [showAddProject, setShowAddProject] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [editProjectId, setEditProjectId] = useState(null);
  const [editMaterials, setEditMaterials] = useState([]);

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
              <p className="text-dark-600 text-base font-medium">Monitor and update material inventory for each project. Only projects in the system can be tracked.</p>
            </div>
            <Button size="lg" variant="primary" onClick={handleShowAddProject} className="font-semibold shadow-md">+ Add Project</Button>
          </div>

          {/* Add Project Form */}
          {showAddProject && (
            <form className="mb-8 flex flex-col md:flex-row gap-3 md:items-end bg-dark-50 p-4 rounded-xl border border-dark-100" onSubmit={handleAddProject}>
              <FormSelect
                label="Select Project"
                className="min-w-[220px] flex-1"
                value={selectedProjectId}
                onChange={e => setSelectedProjectId(e.target.value)}
                options={mockProjects
                  .filter(p => !projects.some(tracked => tracked.id === p.id))
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
                    <table className="min-w-full text-base">
                      <thead>
                        <tr className="bg-dark-100 text-dark-700">
                          <th className="px-4 py-2 text-left">Material</th>
                          <th className="px-4 py-2 text-right">Required</th>
                          <th className="px-4 py-2 text-right">Available</th>
                          <th className="px-4 py-2 text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {project.materials.length === 0 && (
                          <tr><td colSpan={4} className="text-center text-dark-400 py-4">No materials added yet.</td></tr>
                        )}
                        {project.materials.map((mat) => {
                          const isLow = mat.available < mat.required;
                          return (
                            <tr key={mat.id} className={isLow ? 'bg-red-50' : 'bg-white'}>
                              <td className="px-4 py-3 font-semibold text-dark-900 whitespace-nowrap">{mat.name}</td>
                              <td className="px-4 py-3 text-right text-dark-800 whitespace-nowrap">{mat.required} {mat.unit}</td>
                              <td className="px-4 py-3 text-right text-dark-800 whitespace-nowrap">{mat.available} {mat.unit}</td>
                              <td className="px-4 py-3 text-center">
                                {isLow ? (
                                  <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold">Insufficient</span>
                                ) : (
                                  <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">Sufficient</span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
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





